import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { getProfile, type Model } from "@/api";
import { useProviders } from "@/api/model";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { isOptionDisabled } from "./modelAccess";

// пути интерсепт-модалок (@modal/(.)*): рендерятся ПОВЕРХ текущей страницы,
// сама страница с селектом при этом остаётся смонтированной
const OVERLAY_PATHS = ["/login", "/auth", "/plans", "/payment", "/settings"];

export const useModel = () => {
  const router = useRouter();
  const pathname = usePathname();

  // пока открыта модалка (например, окно входа), фильтр моделей должен
  // считаться по странице ПОД ней — иначе на /image-chat выбранная
  // картиночная модель молча затирается текстовым дефолтом
  const basePathnameRef = useRef(pathname);
  if (!OVERLAY_PATHS.some((path) => pathname.startsWith(path))) {
    basePathnameRef.current = pathname;
  }
  const basePathname = basePathnameRef.current;

  const { model, setModel } = useModelContext();

  const { data: providers } = useProviders();
  const { data: profile, isPending: isProfilePending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    refetchInterval: false,
  });

  const filteredProviders = useMemo(() => {
    if (!providers) return [];

    return providers
      .reduce(
        (acc, provider) => {
          if (/\/chat\/.+/.test(basePathname)) {
            acc.push(provider);
          } else if (basePathname === "/image-chat") {
            // для страницы выбора модели показываем все модели
            acc.push({
              ...provider,
              models: provider.models.filter((model) => model.for_image),
            });
          } else {
            acc.push({
              ...provider,
              models: provider.models.filter((model) => !model.for_image),
            });
          }
          return acc;
        },
        [] as typeof providers,
      )
      .filter((provider) => provider.models.length > 0);
  }, [providers, basePathname]);

  const providersById = useMemo(
    () =>
      filteredProviders?.reduce(
        (acc, provider) => {
          provider.models.forEach((model) => {
            acc[model.id] = provider.name;
          });

          return acc;
        },
        {} as Record<string, string>,
      ),
    [filteredProviders],
  );
  const models = useMemo(() => {
    return filteredProviders?.flatMap((provider) => provider.models) ?? [];
  }, [filteredProviders]);

  useEffect(() => {
    const currentModel = model
      ? models.find((m) => m.id === model.id)
      : undefined;

    // выбранная модель могла стать недоступной (логаут, слетела подписка) —
    // проверяем только с загруженным профилем, чтобы не сбросить выбор
    // подписчика, пока его профиль ещё едет
    const currentModelLocked =
      profile && currentModel && isOptionDisabled(profile)(currentModel);

    // если модель не выбрана или недоступна, выбираем первую ДОСТУПНУЮ:
    // гостю нельзя дефолтить недоступную gpt-4o — его дефолт gpt-4o-mini
    if (filteredProviders && (!currentModel || currentModelLocked)) {
      const firstAvailableModel = models.find(
        (m) => !isOptionDisabled(profile)(m),
      );

      const firstModel = firstAvailableModel ?? models[0];

      if (firstModel) {
        setModel(firstModel);
      }
    }
  }, [filteredProviders, profile, model, models, setModel]);

  const selectedModel = model ? models.find((m) => m.id === model.id) : null;

  const onModelChange = (selectedOption: Model | null) => {
    // клик по недоступной модели (замочек / «Плюс»), выбор не меняем:
    // гостя ведём в окно входа, залогиненному показываем тарифы
    if (selectedOption && isOptionDisabled(profile)(selectedOption)) {
      // пока профиль едет, права неизвестны — клик молчит, как disabled
      if (isProfilePending) return;

      router.push(profile && profile.status !== "guest" ? "/plans" : "/login");
      return;
    }

    if (selectedOption) {
      setModel(selectedOption);
    }

    if (basePathname !== "/") {
      router.push(selectedOption?.for_image ? "/image-chat" : "/");
    }
  };

  return {
    selectedModel,
    providersById,
    providers: filteredProviders,
    onModelChange,
  };
};

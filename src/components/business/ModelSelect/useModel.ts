import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { getProviders, type Model } from "@/api";
import { useModelContext } from "@/providers/ModelProvider/hooks";

export const useModel = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { model, setModel } = useModelContext();

  const { data: providers } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
    refetchInterval: false,
  });

  const filteredProviders = useMemo(() => {
    if (!providers) return [];

    return providers
      .reduce(
        (acc, provider) => {
          if (/\/chat\/.+/.test(pathname)) {
            acc.push(provider);
          } else if (pathname === "/image-chat") {
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
  }, [providers, pathname]);

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
    // если модель не выбрана, выбираем первую из первой найденной модели
    if (
      filteredProviders &&
      (!model || models.find((m) => m.id === model.id) === undefined)
    ) {
      const firstProvider = filteredProviders?.[0];
      const firstModel = firstProvider?.models?.[0];

      if (firstModel) {
        setModel(firstModel);
      }
    }
  }, [filteredProviders]);

  const selectedModel = model ? models.find((m) => m.id === model.id) : null;

  const onModelChange = (selectedOption: Model | null) => {
    if (selectedOption) {
      setModel(selectedOption);
    }

    if (pathname !== "/") {
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

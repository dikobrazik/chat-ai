import { useMemo } from "react";
import { useProviders } from "@/api/model";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { useSearchContext } from "@/providers/SearchProvider/hooks";

// поиск в сети — только для текстовых моделей: картиночным он не нужен,
// поэтому в их чатах не показываем кнопку и не шлём with_search
export const useSearch = () => {
  const { withSearch, setWithSearch } = useSearchContext();
  const { model } = useModelContext();
  const { data: providers } = useProviders();

  const currentModelId = model?.id;

  const isSearchAvailable = useMemo(() => {
    const currentModel = providers
      ?.flatMap((provider) => provider.models)
      .find((providerModel) => providerModel.id === currentModelId);

    return !currentModel?.for_image;
  }, [providers, currentModelId]);

  return {
    isSearchAvailable,
    withSearch: withSearch && isSearchAvailable,
    setWithSearch,
  };
};

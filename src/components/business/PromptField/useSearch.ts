import { useMemo } from "react";
import { useProviders } from "@/api/model";
import { useChatSettingsContext } from "@/providers/ChatSettingsProvider/hooks";

export const useSearch = () => {
  const { model, withSearch, setWithSearch } = useChatSettingsContext();
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

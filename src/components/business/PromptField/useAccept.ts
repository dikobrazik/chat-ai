import { useMemo } from "react";
import { useProviders } from "@/api/model";
import { useModelContext } from "@/providers/ModelProvider/hooks";

const DEFAULT_ACCEPT = "image/*,application/pdf,.doc,.docx,.txt,.md";

export const useAccept = () => {
  const { model } = useModelContext();
  const { data: providers } = useProviders();

  const currentModelId = model?.id;

  return useMemo(() => {
    const currentModelProvider = providers?.find((provider) =>
      provider.models.find(
        (providerModel) => providerModel.id === currentModelId,
      ),
    );

    // deepseek
    if (currentModelProvider?.id === 4) {
      return undefined;
    }

    // claude
    if (currentModelProvider?.id === 5) {
      return "image/*,application/pdf";
    }

    return DEFAULT_ACCEPT;
  }, [providers, currentModelId]);
};

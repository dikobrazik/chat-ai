import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AdminModels, updateAdminModel } from "..";
import { ADMIN_MODELS_QUERY_KEY } from "./useAdminModels";

type Variables = {
  modelId: string;
  isEnabled: boolean;
};

export const useUpdateAdminModel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ modelId, isEnabled }: Variables) =>
      updateAdminModel(modelId, { is_enabled: isEnabled }),
    onSuccess: (updatedModel) => {
      queryClient.setQueryData(
        ADMIN_MODELS_QUERY_KEY,
        (oldData: AdminModels) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            models: oldData.models.map((model) =>
              model.id === updatedModel.id ? updatedModel : model,
            ),
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: ADMIN_MODELS_QUERY_KEY });
    },
  });

  return {
    updateModel: mutation.mutateAsync,
    updatingModelId: mutation.isPending ? mutation.variables?.modelId : null,
  };
};

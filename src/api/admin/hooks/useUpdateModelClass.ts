import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AdminModels, type ModelClass, updateModelClass } from "..";
import { ADMIN_MODELS_QUERY_KEY } from "./useAdminModels";

type Variables = {
  modelId: string;
  modelClass: ModelClass;
};

export const useUpdateModelClass = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ modelId, modelClass }: Variables) =>
      updateModelClass(modelId, modelClass),
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
    updateClass: mutation.mutateAsync,
    updatingModelId: mutation.isPending ? mutation.variables?.modelId : null,
  };
};

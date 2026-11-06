import { toast } from "react-toastify/unstyled";
import { type AdminModel, type ModelClass, useUpdateModelClass } from "@/api";

export const useModelClass = () => {
  const { updateClass, updatingModelId } = useUpdateModelClass();

  const changeClass = (model: AdminModel, modelClass: ModelClass) =>
    updateClass({ modelId: model.id, modelClass })
      .then(() => toast.success(`Класс ${model.name} сохранён`))
      .catch(() => toast.error(`Не удалось сохранить класс ${model.name}`));

  return { changeClass, updatingModelId };
};

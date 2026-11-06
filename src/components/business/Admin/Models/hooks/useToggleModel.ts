import { toast } from "react-toastify/unstyled";
import { type AdminModel, useUpdateAdminModel } from "@/api";

export const useToggleModel = () => {
  const { updateModel, updatingModelId } = useUpdateAdminModel();

  const toggleModel = (model: AdminModel) =>
    updateModel({ modelId: model.id, isEnabled: !model.is_enabled })
      .then((updatedModel) =>
        toast.success(
          updatedModel.is_enabled
            ? `${updatedModel.name} включена на сайте`
            : `${updatedModel.name} выключена на сайте`,
        ),
      )
      .catch(() => toast.error(`Не удалось изменить ${model.name}`));

  return { toggleModel, updatingModelId };
};

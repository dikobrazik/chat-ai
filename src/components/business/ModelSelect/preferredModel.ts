import type { Model } from "@/api";
import { PREFERRED_MODELS_LOCAL_STORAGE_KEY } from "@/constants/model";

type PreferredModels = {
  text?: string;
  image?: string;
};

const getModelType = (forImage: boolean): keyof PreferredModels =>
  forImage ? "image" : "text";

const getPreferredModels = (): PreferredModels =>
  JSON.parse(localStorage.getItem(PREFERRED_MODELS_LOCAL_STORAGE_KEY) ?? "{}");

export const savePreferredModel = (model: Pick<Model, "id" | "for_image">) =>
  localStorage.setItem(
    PREFERRED_MODELS_LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...getPreferredModels(),
      [getModelType(model.for_image)]: model.id,
    }),
  );

export const getPreferredModelId = (forImage: boolean) =>
  getPreferredModels()[getModelType(forImage)];

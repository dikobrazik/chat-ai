import axios from "axios";
import type { AdminModel, AdminModels, ProviderBalances } from "./types";

type UpdateAdminModelPayload = Pick<AdminModel, "is_enabled">;

export const getAdminModels = () =>
  axios.get<AdminModels>("admin/models").then((response) => response.data);

export const updateAdminModel = (
  modelId: string,
  payload: UpdateAdminModelPayload,
) =>
  axios
    .patch<AdminModel>(`admin/models/${encodeURIComponent(modelId)}`, payload)
    .then((response) => response.data);

export const getProviderBalances = () =>
  axios
    .get<ProviderBalances>("admin/balances")
    .then((response) => response.data);

export * from "./hooks";
export * from "./types";

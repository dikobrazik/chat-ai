import axios from "axios";
import type {
  AdminModel,
  AdminModels,
  AdminSession,
  ModelClass,
  ProviderBalances,
} from "./types";

export const getAdminSession = () =>
  axios.get<AdminSession>("admin/session").then((response) => response.data);

export const sendAdminCode = () =>
  axios.post<void>("admin/session/code").then((response) => response.data);

export const confirmAdminCode = (code: string) =>
  axios
    .post<AdminSession>("admin/session", { code })
    .then((response) => response.data);

export const getAdminModels = () =>
  axios.get<AdminModels>("admin/models").then((response) => response.data);

export const updateModelClass = (modelId: string, modelClass: ModelClass) =>
  axios
    .patch<AdminModel>(`admin/models/${encodeURIComponent(modelId)}`, {
      class: modelClass,
    })
    .then((response) => response.data);

export const getProviderBalances = () =>
  axios
    .get<ProviderBalances>("admin/balances")
    .then((response) => response.data);

export * from "./hooks";
export * from "./types";

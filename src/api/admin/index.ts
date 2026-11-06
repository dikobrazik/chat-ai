import axios from "axios";
import type { AdminModels, AdminSession } from "./types";

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

export * from "./hooks";
export * from "./types";

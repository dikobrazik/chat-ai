import axios from "axios";
import { BASE_API_URL } from "@/config";

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.withCredentials = true;

export function setAuthToken(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export * from "./auth";
export * from "./chat";
export * from "./files";
export * from "./model";
export * from "./subscription";
export * from "./user";

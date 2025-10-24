import { BASE_API_URL } from "@/config";
import axios from "axios";

axios.defaults.baseURL = BASE_API_URL;

export function setAuthToken(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export * from "./auth";
export * from "./chat";

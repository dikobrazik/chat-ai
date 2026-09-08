import axios from "axios";
import type { Profile } from "./types";

export const getProfile = () =>
  axios.get<Profile>("user/profile").then((response) => response.data);

export * from "./hooks";
export * from "./types";

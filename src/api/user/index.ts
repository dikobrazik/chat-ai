import axios from "axios";
import type { Profile, UpdateProfilePayload } from "./types";

export const getProfile = () =>
  axios.get<Profile>("user/profile").then((response) => response.data);

export const updateProfile = (payload: UpdateProfilePayload) =>
  axios.patch<void>("user/profile", payload).then((response) => response.data);

export * from "./hooks";
export * from "./types";

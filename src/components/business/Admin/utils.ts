import { isAxiosError } from "axios";
import { PROVIDER_ICONS } from "./constants";

export const getProviderIcon = (provider: string) =>
  PROVIDER_ICONS[provider] ?? `/icons/providers/${provider}.png`;

export const isAccessError = (error: Error | null) =>
  isAxiosError(error) &&
  (error.response?.status === 401 || error.response?.status === 403);

import {
  AUTH_REDIRECT_LIFETIME,
  AUTH_REDIRECT_SESSION_STORAGE_KEY,
} from "@/constants/auth";

export const saveAuthRedirect = (path: string) =>
  sessionStorage.setItem(
    AUTH_REDIRECT_SESSION_STORAGE_KEY,
    JSON.stringify({ path, savedAt: Date.now() }),
  );

export const takeAuthRedirect = () => {
  const stored = sessionStorage.getItem(AUTH_REDIRECT_SESSION_STORAGE_KEY);

  sessionStorage.removeItem(AUTH_REDIRECT_SESSION_STORAGE_KEY);

  if (!stored) {
    return "/";
  }

  const { path, savedAt } = JSON.parse(stored);

  return Date.now() - savedAt > AUTH_REDIRECT_LIFETIME ? "/" : path;
};

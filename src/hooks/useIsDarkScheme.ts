import { useSyncExternalStore } from "react";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(DARK_SCHEME_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(DARK_SCHEME_QUERY).matches;

const getServerSnapshot = () => false;

export const useIsDarkScheme = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

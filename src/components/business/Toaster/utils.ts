import type { ToastPosition } from "react-toastify/unstyled";
import { MOBILE_MEDIA_QUERY } from "./constants";

export const subscribeToMobileQuery = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

export const getToastPosition = (): ToastPosition =>
  window.matchMedia(MOBILE_MEDIA_QUERY).matches
    ? "bottom-center"
    : "top-center";

export const getServerToastPosition = (): ToastPosition => "top-center";

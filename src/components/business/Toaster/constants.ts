import type { TypeOptions } from "react-toastify/unstyled";
import type { IconName } from "@/components/ui/Icon/icons";
import { MOBILE_BREAKPOINT } from "@/hooks/useMobile";

export const TOAST_ICONS: Record<TypeOptions, IconName> = {
  success: "tick-circle",
  error: "close-circle",
  info: "information",
  warning: "information",
  default: "information",
};

export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

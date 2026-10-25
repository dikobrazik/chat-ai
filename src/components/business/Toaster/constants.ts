import type { TypeOptions } from "react-toastify/unstyled";
import type { IconName } from "@/components/ui/Icon/icons";

export const TOAST_ICONS: Record<TypeOptions, IconName> = {
  success: "tick-circle",
  error: "close-circle",
  info: "information",
  warning: "information",
  default: "information",
};

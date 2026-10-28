import type { IconName } from "@/components/ui/Icon/icons";
import type { AlertType } from "../plugins";

export const ALERT_ICONS: Record<AlertType, IconName> = {
  note: "information",
  tip: "lamp-on",
  important: "flash-circle",
  warning: "info-circle",
  caution: "close-circle",
};

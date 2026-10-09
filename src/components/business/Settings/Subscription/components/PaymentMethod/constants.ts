import type { PaymentMethod } from "@/api";
import type { IconName } from "@/components/ui/Icon/icons";

export const PAYMENT_METHOD_ICON: Record<PaymentMethod["type"], IconName> = {
  tpay: "flash-circle",
  sbp: "lock",
};

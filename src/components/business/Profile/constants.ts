import type { BadgeVariant } from "@/components/ui/Badge";

export const USER_STATUS_MAP: Record<string, string> = {
  active: "Бесплатный",
  verified: "Бесплатный",
  subscription_plus: "Плюс",
  subscription_pro: "Про",
};

export const USER_STATUS_BADGE_VARIANT_MAP: Record<string, BadgeVariant> = {
  active: "secondary",
  verified: "secondary",
  subscription_plus: "primary",
  subscription_pro: "danger",
};

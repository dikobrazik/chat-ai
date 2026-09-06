import type { ButtonVariant } from "@/components/ui/Button";
import { PLANS_MAP } from "@/constants/plans";

export const TRIAL_PRICE = 1;
export const SIX_MONTHS_COUNT = 6;

export const CURRENT_PLAN_TEXT = "Текущий план";
export const TRIAL_BUTTON_TEXT = "Попробовать за 1 ₽";
export const DOWNGRADE_BUTTON_TEXT = "Пройденный шаг";
export const POPULAR_BADGE_TEXT = "Популярный";
export const CANCEL_ANYTIME_TEXT = "Можно отменить в любое время";
export const MONTH_PERIOD_TEXT = "месяц";
export const SIX_MONTHS_TOTAL_TEXT = "за 6 месяцев";

export const SUBSCRIPTION_BUTTON_TEXT = {
  [PLANS_MAP.base]: "Прошлый век",
  [PLANS_MAP.plus]: "Перейти на Plus",
  [PLANS_MAP.pro]: "Перейти на Pro",
} as Record<string, string>;

export const SUBSCRIPTION_BUTTON_VARIANT = {
  [PLANS_MAP.base]: "base",
  [PLANS_MAP.plus]: "primary",
  [PLANS_MAP.pro]: "pro",
} as Record<string, ButtonVariant>;

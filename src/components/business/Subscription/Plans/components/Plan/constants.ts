import type { ButtonVariant } from "@/components/ui/Button";
import { PLANS_MAP } from "@/constants/plans";

export const TRIAL_PRICE = 10;
export const SIX_MONTHS_COUNT = 6;

export const CURRENT_PLAN_TEXT = "Текущий тариф";
export const INCLUDED_PLAN_TEXT = "Входит в ваш тариф";
export const TRIAL_BUTTON_TEXT = "Попробовать за 10 ₽";
export const POPULAR_BADGE_TEXT = "Популярный";
export const CANCEL_ANYTIME_TEXT = "Можно отменить в любое время";
export const MONTH_PERIOD_TEXT = "месяц";
export const SIX_MONTHS_TOTAL_TEXT = "за 6 месяцев";

export const PLANS_ORDER: string[] = [
  PLANS_MAP.base,
  PLANS_MAP.plus,
  PLANS_MAP.pro,
];

export const SUBSCRIPTION_BUTTON_TEXT = {
  [PLANS_MAP.base]: "Войти",
  [PLANS_MAP.plus]: "Подключить",
  [PLANS_MAP.pro]: "Подключить",
} as Record<string, string>;

export const SUBSCRIPTION_BUTTON_VARIANT = {
  [PLANS_MAP.base]: "base",
  [PLANS_MAP.plus]: "primary",
  [PLANS_MAP.pro]: "pro",
} as Record<string, ButtonVariant>;

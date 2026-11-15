import { PLANS_MAP } from "@/constants/plans";

// статусы профиля (user/profile → status) с платной подпиской
export const SUBSCRIBED_USER_STATUSES = [
  "subscription_plus",
  "subscription_pro",
];

export const PLAN_BY_USER_STATUS: Record<string, string> = {
  subscription_plus: PLANS_MAP.plus,
  subscription_pro: PLANS_MAP.pro,
};

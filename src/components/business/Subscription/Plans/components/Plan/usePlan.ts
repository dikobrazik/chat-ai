import type { Plan, Subscription } from "@/api/subscription";
import { PLANS_MAP } from "@/constants/plans";
import { formatCurrency } from "@/utils/format-currency";
import {
  CURRENT_PLAN_TEXT,
  DOWNGRADE_BUTTON_TEXT,
  MONTH_PERIOD_TEXT,
  SIX_MONTHS_COUNT,
  SIX_MONTHS_TOTAL_TEXT,
  SUBSCRIPTION_BUTTON_TEXT,
  SUBSCRIPTION_BUTTON_VARIANT,
  TRIAL_BUTTON_TEXT,
  TRIAL_PRICE,
} from "./constants";

type UsePlanParams = {
  plan: Plan;
  activePlan?: Subscription["plan"];
  discount?: number;
  isSixMonths?: boolean;
};

export const usePlan = ({
  plan,
  activePlan,
  discount,
  isSixMonths,
}: UsePlanParams) => {
  const isActive = activePlan === plan.id;
  const isTrial = Boolean(plan.freeDays);

  const discountMultiplier = discount ? (100 - discount) / 100 : 1;
  const finalPrice = isTrial ? TRIAL_PRICE : plan.price * discountMultiplier;
  const hasOldPrice =
    (isSixMonths && plan.price > 0) || finalPrice !== plan.price;

  let buttonText = isActive
    ? CURRENT_PLAN_TEXT
    : SUBSCRIPTION_BUTTON_TEXT[plan.id];

  if (isTrial) {
    buttonText = TRIAL_BUTTON_TEXT;
  }

  if (activePlan === PLANS_MAP.pro && plan.id === PLANS_MAP.plus) {
    buttonText = DOWNGRADE_BUTTON_TEXT;
  }

  return {
    isActive,
    buttonText,
    buttonVariant: SUBSCRIPTION_BUTTON_VARIANT[plan.id],
    price: formatCurrency(finalPrice),
    oldPrice: hasOldPrice ? formatCurrency(plan.price) : null,
    period: isTrial ? `в течение ${plan.freeDays} дней` : MONTH_PERIOD_TEXT,
    subtitle:
      isSixMonths && finalPrice > 0
        ? `${formatCurrency(finalPrice * SIX_MONTHS_COUNT)} ${SIX_MONTHS_TOTAL_TEXT}`
        : plan.description,
    featuresTitle: plan.features[0],
    features: plan.features.slice(1),
  };
};

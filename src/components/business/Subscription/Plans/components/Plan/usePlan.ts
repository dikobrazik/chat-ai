import type { Plan, Subscription } from "@/api/subscription";
import { formatCurrency } from "@/utils/format-currency";
import { pluralize } from "@/utils/pluralize";
import {
  CURRENT_PLAN_TEXT,
  INCLUDED_PLAN_TEXT,
  MONTH_PERIOD_TEXT,
  PLANS_ORDER,
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
  const isIncluded =
    activePlan !== undefined &&
    PLANS_ORDER.indexOf(plan.id) < PLANS_ORDER.indexOf(activePlan);
  const trialDays = isActive || isIncluded ? 0 : (plan.freeDays ?? 0);
  const isTrial = trialDays > 0;

  const discountMultiplier = discount ? (100 - discount) / 100 : 1;
  const finalPrice = isTrial ? TRIAL_PRICE : plan.price * discountMultiplier;
  const hasOldPrice =
    (isSixMonths && plan.price > 0) || finalPrice !== plan.price;

  let buttonText = SUBSCRIPTION_BUTTON_TEXT[plan.id];

  if (isTrial) {
    buttonText = TRIAL_BUTTON_TEXT;
  }

  if (isIncluded) {
    buttonText = INCLUDED_PLAN_TEXT;
  }

  if (isActive) {
    buttonText = CURRENT_PLAN_TEXT;
  }

  return {
    isDisabled: isActive || isIncluded,
    isCancelable: plan.price > 0,
    buttonText,
    buttonVariant: SUBSCRIPTION_BUTTON_VARIANT[plan.id],
    price: formatCurrency(finalPrice),
    oldPrice: hasOldPrice ? formatCurrency(plan.price) : null,
    period: isTrial
      ? `за ${trialDays} ${pluralize(trialDays, ["день", "дня", "дней"])}`
      : MONTH_PERIOD_TEXT,
    subtitle:
      isSixMonths && finalPrice > 0
        ? `${formatCurrency(finalPrice * SIX_MONTHS_COUNT)} ${SIX_MONTHS_TOTAL_TEXT}`
        : plan.description,
    tokensLimit: plan.dailyTokens || plan.tokens || null,
    isDailyLimit: Boolean(plan.dailyTokens),
    dialogsUpTo: plan.dialogsUpTo || null,
    imagesUpTo: plan.imagesUpTo || null,
    fastModelsCount: plan.fastModelsCount || null,
    advancedModelsCount: plan.advancedModelsCount || null,
    heavyModelsCount: plan.heavyModelsCount || null,
  };
};

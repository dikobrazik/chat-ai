import type { Plan } from "@/api/subscription";
import { formatChargeDate } from "@/components/business/PaymentStatus/utils";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import type { PaymentMethodId } from "../../constants";

export const usePlanCard = (
  plan: Plan,
  isSixMonths: boolean,
  paymentMethod: PaymentMethodId,
) => {
  const { periodPrice, firstPayment, trialDays } = getPlanPricing(
    plan,
    isSixMonths,
    paymentMethod,
  );

  const [featuresTitle, ...features] = plan.features;

  return {
    featuresTitle,
    features,
    periodPrice,
    firstPayment,
    trialDays,
    nextChargeDate: formatChargeDate(plan.nextChargeAt),
  };
};

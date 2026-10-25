import type { Plan } from "@/api/subscription";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import type { PendingPayment } from "@/utils/pending-payment";
import type { PaymentMethodId } from "./constants";

export const createPendingPayment = (
  plan: Plan,
  isSixMonths: boolean,
  paymentMethod: PaymentMethodId,
): PendingPayment => {
  const { firstPayment, nextPayment, trialDays } = getPlanPricing(
    plan,
    isSixMonths,
    paymentMethod,
  );

  return {
    planId: plan.id,
    isSixMonths,
    isTrial: trialDays > 0,
    amount: firstPayment,
    nextAmount: nextPayment,
  };
};

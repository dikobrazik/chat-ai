import type { Plan } from "@/api/subscription";
import {
  PAYMENT_METHODS_MAP,
  type PaymentMethodId,
} from "../Checkout/constants";

export const SIX_MONTHS_LENGTH = 6;

export const TRIAL_PRICE_BY_PAYMENT_METHOD = {
  [PAYMENT_METHODS_MAP.card]: 1,
  [PAYMENT_METHODS_MAP.tpay]: 1,
  [PAYMENT_METHODS_MAP.sbp]: 10,
};

export type PlanPricing = {
  monthlyPrice: number;
  periodPrice: number;
  fullPeriodPrice: number;
  firstPayment: number;
  nextPayment: number;
  trialDays: number;
  months: number;
};

export const getPlanPricing = (
  plan: Plan,
  isSixMonths = false,
  paymentMethod: PaymentMethodId,
): PlanPricing => {
  const months = isSixMonths ? SIX_MONTHS_LENGTH : 1;
  const discount = isSixMonths ? (plan.discount ?? 0) : 0;

  const monthlyPrice = (plan.price * (100 - discount)) / 100;
  const periodPrice = monthlyPrice * months;
  const trialDays = plan.freeDays ?? 0;

  return {
    monthlyPrice,
    periodPrice,
    fullPeriodPrice: plan.price * months,
    firstPayment: trialDays
      ? TRIAL_PRICE_BY_PAYMENT_METHOD[paymentMethod]
      : periodPrice,
    nextPayment: periodPrice,
    trialDays,
    months,
  };
};

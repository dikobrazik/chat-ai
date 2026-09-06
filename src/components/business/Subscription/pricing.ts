import type { Plan } from "@/api/subscription";

export const SIX_MONTHS_LENGTH = 6;

// на пробном периоде списывается 1 ₽ — подтверждение карты и согласие
// на рекуррентные платежи (п. 9.2 оферты)
export const TRIAL_PRICE = 1;

export type PlanPricing = {
  /** цена за месяц со скидкой за 6 месяцев, если она есть */
  monthlyPrice: number;
  /** сколько спишется за весь период — месяц или 6 месяцев */
  periodPrice: number;
  /** цена периода без скидки, для зачёркивания */
  fullPeriodPrice: number;
  /** сколько спишется прямо сейчас: 1 ₽ на пробном периоде */
  firstPayment: number;
  /** сколько спишется после пробного периода */
  nextPayment: number;
  trialDays: number;
  months: number;
};

// скидка на бэке приходит у обоих вариантов плана, но применяется только
// к оплате за 6 месяцев — так же считает карточка тарифа (Plans/components/Plan)
export const getPlanPricing = (
  plan: Plan,
  isSixMonths = false,
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
    firstPayment: trialDays ? TRIAL_PRICE : periodPrice,
    nextPayment: periodPrice,
    trialDays,
    months,
  };
};

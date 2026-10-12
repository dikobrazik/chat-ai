import type { PlanId } from "@/api/subscription";
import {
  PENDING_PAYMENT_LIFETIME,
  PENDING_PAYMENT_LOCAL_STORAGE_KEY,
} from "@/constants/payment";

export type PendingPayment = {
  planId: PlanId;
  isSixMonths: boolean;
  isTrial: boolean;
  amount: number;
  nextAmount: number;
};

export const savePendingPayment = (payment: PendingPayment) =>
  localStorage.setItem(
    PENDING_PAYMENT_LOCAL_STORAGE_KEY,
    JSON.stringify({ ...payment, savedAt: Date.now() }),
  );

export const getPendingPayment = (): PendingPayment | null => {
  const stored = localStorage.getItem(PENDING_PAYMENT_LOCAL_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  const { savedAt, ...payment } = JSON.parse(stored);

  return Date.now() - savedAt > PENDING_PAYMENT_LIFETIME ? null : payment;
};

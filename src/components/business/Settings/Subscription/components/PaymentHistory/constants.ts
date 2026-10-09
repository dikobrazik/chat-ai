import type { Payment } from "@/api";

export const PAYMENTS_PAGE_SIZE = 5;

export const PAYMENT_STATUS_COLOR: Partial<Record<Payment["status"], string>> =
  {
    rejected: "#FC3F1D",
    refunded: "#6F6F6F",
  };

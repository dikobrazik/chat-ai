import type { PendingPayment } from "@/utils/pending-payment";

export type SuccessKind = "trial" | "paid" | "active";

export const getSuccessKind = (payment: PendingPayment | null): SuccessKind => {
  if (!payment) {
    return "active";
  }

  return payment.isTrial ? "trial" : "paid";
};

export const formatChargeDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  })
    .format(new Date(date))
    .replace(" ", "\u00A0");

export const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");

  return domain ? `${name.slice(0, 1)}•••@${domain}` : email;
};

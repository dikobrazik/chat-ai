export const PAYMENT_METHODS_MAP = {
  card: "card",
  tpay: "tpay",
  sbp: "sbp",
} as const;

export type PaymentMethodId =
  (typeof PAYMENT_METHODS_MAP)[keyof typeof PAYMENT_METHODS_MAP];

export const DEFAULT_PAYMENT_METHOD: PaymentMethodId = PAYMENT_METHODS_MAP.tpay;

export const SUPPORT_TELEGRAM_URL = "https://t.me/jonu_support";

export const getPeriodLabel = (isSixMonths: boolean) =>
  isSixMonths ? "6 месяцев" : "месяц";

export const getDaysLabel = (days: number) => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${days} дней`;
  if (lastDigit === 1) return `${days} день`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${days} дня`;

  return `${days} дней`;
};

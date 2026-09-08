import type { IconName } from "@/components/ui/Icon/icons";

export const PAYMENT_METHODS_MAP = {
  card: "card",
  tpay: "tpay",
  sbp: "sbp",
} as const;

export type PaymentMethodId =
  (typeof PAYMENT_METHODS_MAP)[keyof typeof PAYMENT_METHODS_MAP];

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  title: string;
  description: string;
  icon: IconName;
  isComing?: boolean;
}[] = [
  {
    id: PAYMENT_METHODS_MAP.card,
    title: "Карта",
    description: "МИР и российские карты",
    icon: "card",
    isComing: true,
  },
  {
    id: PAYMENT_METHODS_MAP.tpay,
    title: "TPay",
    description: "Оплата в один клик через Т-Банк",
    icon: "flash-circle",
  },
  {
    id: PAYMENT_METHODS_MAP.sbp,
    title: "Оплата по СБП",
    description: "Через приложение вашего банка",
    icon: "lock",
  },
];

export const DEFAULT_PAYMENT_METHOD = PAYMENT_METHODS.find(
  (method) => !method.isComing,
)?.id as PaymentMethodId;

export const SUPPORT_TELEGRAM_URL = "https://t.me/jonu_support";

export const PAYMENT_ERROR_TEXT =
  "Не удалось начать оплату. Попробуйте ещё раз или напишите в поддержку";

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

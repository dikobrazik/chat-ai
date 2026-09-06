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
}[] = [
  {
    id: PAYMENT_METHODS_MAP.card,
    title: "Банковская карта",
    description: "МИР и российские карты",
    icon: "card",
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

export const SUPPORT_TELEGRAM_URL = "https://t.me/jonu_support";
export const SUPPORT_EMAIL = "support@jonu.ru";

export const PAYMENT_ERROR_TEXT =
  "Не удалось начать оплату. Попробуйте ещё раз или напишите в поддержку";

// сколько банков показываем до того, как пользователь начнёт искать: бэк
// отдаёт ~170 штук, весь список сразу — стена логотипов. Шесть влезают
// в свёрнутый список без скроллбара
export const SBP_BANKS_PREVIEW_COUNT = 6;

/** «месяц» / «6 месяцев» — для «за 6 месяцев», «первый оплаченный месяц» */
export const getPeriodLabel = (isSixMonths: boolean) =>
  isSixMonths ? "6 месяцев" : "месяц";

/** «каждый месяц» / «каждые 6 месяцев» */
export const getEveryPeriodLabel = (isSixMonths: boolean) =>
  isSixMonths ? "каждые 6 месяцев" : "каждый месяц";

/** «Через 1 день» / «Через 3 дня» / «Через 7 дней» */
export const getDaysLabel = (days: number) => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${days} дней`;
  if (lastDigit === 1) return `${days} день`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${days} дня`;

  return `${days} дней`;
};

import type { Plan } from "@/api/subscription";
import { PLANS_MAP } from "@/constants/plans";

export const MONTH_TAB_KEY = "1-month";
export const SIX_MONTHS_TAB_KEY = "6-months";

export const PLANS_TITLE = "Попробуйте Плюс за 10 ₽";

export const MONTH_TAB_LABEL = "Месяц";
export const SIX_MONTHS_TAB_LABEL = "6 месяцев";

export const AUTO_RENEWAL_DISCLAIMER =
  "Подписка продлевается автоматически: стоимость тарифа списывается за каждый следующий оплаченный период (месяц или 6 месяцев). Отключить продление можно в настройках в любой момент.";

export const OFFER_ACCEPTANCE_TEXT =
  "Нажимая кнопку «Оплатить», вы соглашаетесь с";

export const OFFER_LINK_TEXT = "офертой";

export const CLOSE_BUTTON_LABEL = "Закрыть";

export const SIX_MONTHS_DISCOUNT = 15;

export const TARIFF_PLANS: Plan[] = [
  {
    id: PLANS_MAP.base,
    name: "Бесплатный",
    description: "Для простых задач и знакомства",
    price: 0,
    nextChargeAt: "",
    tokens: 6_000_000,
    dailyTokens: 200_000,
    dialogsUpTo: 40,
    imagesUpTo: 3,
    fastModelsCount: 52,
    advancedModelsCount: 1,
    features: [],
  },
  {
    id: PLANS_MAP.plus,
    name: "Плюс",
    description: "Для регулярных задач",
    price: 990,
    freeDays: 3,
    isPopular: true,
    nextChargeAt: "",
    tokens: 40_000_000,
    dialogsUpTo: 8_062,
    imagesUpTo: 775,
    fastModelsCount: 52,
    advancedModelsCount: 63,
    features: [],
  },
  {
    id: PLANS_MAP.pro,
    name: "Профессиональный",
    description: "Для сложных задач и больших объёмов",
    price: 1_990,
    nextChargeAt: "",
    tokens: 100_000_000,
    dialogsUpTo: 20_156,
    imagesUpTo: 1_938,
    fastModelsCount: 52,
    advancedModelsCount: 63,
    heavyModelsCount: 8,
    features: [],
  },
];

export const SIX_MONTHS_TARIFF_PLANS: Plan[] = TARIFF_PLANS.map(
  ({ freeDays, ...plan }) => ({
    ...plan,
    discount: plan.price ? SIX_MONTHS_DISCOUNT : undefined,
  }),
);

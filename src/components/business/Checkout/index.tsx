"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify/unstyled";
import {
  getProfile,
  getTPayLink,
  linkBank,
  useCurrentSubscription,
  usePlans,
} from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "@/components/business/Subscription/constants";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import styles from "./Checkout.module.scss";
import { CheckoutMessage } from "./components/CheckoutMessage";
import { PaymentMethods } from "./components/PaymentMethods";
import { PlanCard } from "./components/PlanCard";
import { SbpBanks } from "./components/SbpBanks";
import {
  DEFAULT_PAYMENT_METHOD,
  getDaysLabel,
  getPeriodLabel,
  PAYMENT_ERROR_TEXT,
  PAYMENT_METHODS_MAP,
  type PaymentMethodId,
  SUPPORT_TELEGRAM_URL,
} from "./constants";

// контракт СБП-ручки не подтверждён (бэк объявляет просто string), а ссылка
// на приложение банка приходит своей схемой — bank100000000111://... —
// поэтому по протоколу не фильтруем
const LINK_FIELDS = ["Data", "Payload", "link", "url", "RedirectUrl"];

const resolvePaymentLink = (payload: unknown): string | undefined => {
  if (typeof payload === "string") {
    return payload.trim() || undefined;
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const field = LINK_FIELDS.find(
      (key) => typeof record[key] === "string" && record[key],
    );

    return field ? (record[field] as string) : undefined;
  }

  return undefined;
};

export const Checkout = () => {
  const { plan: planId } = useParams<{ plan: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSixMonths = searchParams.get(SIX_MONTHS_QUERY_KEY) === "true";

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(
    DEFAULT_PAYMENT_METHOD,
  );
  const [selectedBankId, setSelectedBankId] = useState<string>();
  const [isPaying, setIsPaying] = useState(false);

  const { plans, sixMonthsPlans, isLoading, isError } = usePlans();
  const { data: currentSubscription } = useCurrentSubscription();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const plan = (isSixMonths ? sixMonthsPlans : plans).find(
    (item) => item.id === planId,
  );

  const onClose = () => {
    // при заходе по прямой ссылке возвращаться некуда: history.length у свежей
    // вкладки уже 2 (about:blank + страница), и router.back() уводит в пустоту
    const cameFromApp =
      window.history.length > 2 ||
      document.referrer.startsWith(window.location.origin);

    if (cameFromApp) {
      router.back();
      return;
    }

    router.push("/plans");
  };

  const onPay = async () => {
    setIsPaying(true);

    try {
      if (selectedMethod === PAYMENT_METHODS_MAP.tpay) {
        const { RedirectUrl } = await getTPayLink({
          plan: planId,
          sixMonths: isSixMonths,
        });

        window.location.href = RedirectUrl;
        return;
      }

      if (selectedBankId) {
        const link = resolvePaymentLink(
          await linkBank({ bankId: selectedBankId }),
        );

        if (!link) {
          throw new Error("СБП не вернул ссылку на оплату");
        }

        window.location.href = link;
        return;
      }
    } catch {
      toast.error(PAYMENT_ERROR_TEXT);
    }

    setIsPaying(false);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.checkout}>
          <Skeleton isLoading height={320} />
          <Skeleton isLoading height={520} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <CheckoutMessage
          title="Не удалось загрузить тарифы"
          description="Проверьте соединение и попробуйте ещё раз"
          actionText="Вернуться к тарифам"
          actionHref="/plans"
        />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className={styles.page}>
        <CheckoutMessage
          title="Такой тариф не найден"
          actionText="Вернуться к тарифам"
          actionHref="/plans"
        />
      </div>
    );
  }

  // страховка: бесплатный тариф на экран оплаты вести не должен
  if (plan.price === 0) {
    return (
      <div className={styles.page}>
        <CheckoutMessage
          title="Этот тариф бесплатный"
          description={`«${plan.name}» доступен без оплаты — платить не за что`}
          actionText="Посмотреть платные тарифы"
          actionHref="/plans"
        />
      </div>
    );
  }

  if (profile?.status === "guest") {
    return (
      <div className={styles.page}>
        <CheckoutMessage
          title="Войдите, чтобы оформить подписку"
          description="Подписка привязывается к аккаунту — без входа оплата не пройдёт"
          actionText="Войти"
          actionHref="/login"
        />
      </div>
    );
  }

  const activeSubscription = currentSubscription?.subscription;

  if (
    activeSubscription?.plan === planId &&
    activeSubscription.status === "active"
  ) {
    return (
      <div className={styles.page}>
        <CheckoutMessage
          title={`Тариф «${plan.name}» уже подключён`}
          description="Повторно оплачивать его не нужно"
          actionText="Посмотреть другие тарифы"
          actionHref="/plans"
        />
      </div>
    );
  }

  const isBankRequired = selectedMethod === PAYMENT_METHODS_MAP.sbp;
  const { firstPayment, periodPrice, trialDays } = getPlanPricing(
    plan,
    isSixMonths,
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button
          className={styles.back}
          leftIcon={<Icon name="chevron-down" className={styles.backIcon} />}
          aria-label="Вернуться к тарифам"
          onClick={onClose}
        />
        <Text as="h1" type="xl">
          Настройте свой план
        </Text>
      </div>

      <div className={styles.checkout}>
        <div className="flex flex-col gap-4">
          <Text style="regular" type="m" color="#6F6F6F">
            Выберите способ оплаты
          </Text>

          <PaymentMethods
            selectedMethod={selectedMethod}
            onMethodSelect={setSelectedMethod}
            content={{
              sbp: (
                <SbpBanks
                  selectedBankId={selectedBankId}
                  onBankSelect={setSelectedBankId}
                />
              ),
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <PlanCard
            plan={plan}
            isSixMonths={isSixMonths}
            isPaying={isPaying}
            isPayDisabled={isBankRequired && !selectedBankId}
            onPay={onPay}
          />

          {/* сумма, периодичность и порядок отказа — обязательный минимум
              у кнопки оплаты (376-ФЗ), одной ссылки на оферту мало */}
          <Text
            className="text-center"
            style="regular"
            type="xs"
            color="#6F6F6F"
          >
            {trialDays
              ? `${formatCurrency(firstPayment)} за ${getDaysLabel(trialDays)}, затем платная подписка — ${formatCurrency(periodPrice)} за ${getPeriodLabel(isSixMonths)}. `
              : `${formatCurrency(periodPrice)} за ${getPeriodLabel(isSixMonths)}. `}
            Продлевается автоматически до отмены — отключить продление можно в
            любой момент в настройках. Кассовый чек придёт на вашу почту.
            Оплачивая, вы соглашаетесь с{" "}
            <Link target="_blank" href="/terms">
              офертой
            </Link>{" "}
            и даёте{" "}
            <Link target="_blank" href="/personal-data-consent">
              согласие на обработку персональных данных
            </Link>
            .
          </Text>

          <Text
            className="text-center"
            style="regular"
            type="s"
            color="#6F6F6F"
          >
            Проблемы с оплатой?{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={SUPPORT_TELEGRAM_URL}
            >
              Напишите нам
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

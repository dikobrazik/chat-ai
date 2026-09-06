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
import { CardWidget } from "./components/CardWidget";
import { CheckoutMessage } from "./components/CheckoutMessage";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentMethods } from "./components/PaymentMethods";
import { SbpBanks } from "./components/SbpBanks";
import {
  getDaysLabel,
  getEveryPeriodLabel,
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

  const [isSixMonths, setIsSixMonths] = useState(
    searchParams.get(SIX_MONTHS_QUERY_KEY) === "true",
  );
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(
    PAYMENT_METHODS_MAP.card,
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
  const monthlyPlan = plans.find((item) => item.id === planId);
  const sixMonthsPlan = sixMonthsPlans.find((item) => item.id === planId);

  const onSixMonthsChange = (checked: boolean) => {
    setIsSixMonths(checked);
    // банк выбирался под другую сумму — заставляем выбрать заново
    setSelectedBankId(undefined);

    // держим ссылку честной, но без навигации: перерисовка страницы сбросила бы
    // выбранный способ оплаты и уже загруженную форму карты
    const params = new URLSearchParams(searchParams);
    params.set(SIX_MONTHS_QUERY_KEY, String(checked));
    window.history.replaceState(null, "", `?${params}`);
  };

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
          <Skeleton isLoading height={420} />
          <Skeleton isLoading height={420} />
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

  // бесплатный тариф на экран оплаты попадать не должен: карточка «Бесплатный»
  // на /plans тоже ведёт сюда, а платить за него нечего
  if (plan.price === 0) {
    return (
      <div className={styles.page}>
        <CheckoutMessage
          title={`Тариф «${plan.name}» бесплатный`}
          description="Оплачивать его не нужно — он уже доступен всем"
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

  const { firstPayment, periodPrice, trialDays } = getPlanPricing(
    plan,
    isSixMonths,
  );
  const everyPeriodLabel = getEveryPeriodLabel(isSixMonths);

  // у формы карты своя кнопка оплаты внутри виджета Т-Банка
  const isCardMethod = selectedMethod === PAYMENT_METHODS_MAP.card;
  const isBankRequired = selectedMethod === PAYMENT_METHODS_MAP.sbp;

  return (
    <div className={styles.page}>
      <Button
        className={styles.close}
        leftIcon={<Icon name="chevron-down" className={styles.backIcon} />}
        aria-label="Вернуться к тарифам"
        onClick={onClose}
      />

      <div className={styles.checkout}>
        <OrderSummary
          plan={plan}
          isSixMonths={isSixMonths}
          sixMonthsDiscount={sixMonthsPlan?.discount}
          losesTrial={!!monthlyPlan?.freeDays && !sixMonthsPlan?.freeDays}
          onSixMonthsChange={onSixMonthsChange}
        />

        <div className="flex flex-col gap-6">
          <div className={styles.total}>
            <Text type="m">К оплате сегодня</Text>
            <Text type="l">{formatCurrency(firstPayment)}</Text>
          </div>

          {/* сумма, периодичность и порядок отказа обязаны быть на экране
              оплаты явно и ВЫШЕ любой кнопки оплаты — в том числе выше кнопки
              внутри виджета Т-Банка */}
          <div className="flex flex-col gap-2">
            <Text style="regular" type="s" color="#6F6F6F">
              {trialDays
                ? `Сегодня спишется ${formatCurrency(firstPayment)}. Через ${getDaysLabel(trialDays)} — ${formatCurrency(periodPrice)}, далее по ${formatCurrency(periodPrice)} ${everyPeriodLabel}, пока вы не отключите продление.`
                : `Подписка продлевается автоматически: ${everyPeriodLabel} будет списываться ${formatCurrency(periodPrice)}, пока вы не отключите продление.`}
            </Text>
            <Text style="regular" type="xs" color="#6F6F6F">
              Оплачивая, вы соглашаетесь с{" "}
              <Link target="_blank" href="/terms">
                офертой
              </Link>{" "}
              и даёте{" "}
              <Link target="_blank" href="/personal-data-consent">
                согласие на обработку персональных данных
              </Link>
              . Кассовый чек придёт на вашу почту. Отключить продление можно в
              любой момент — напишите в поддержку.
            </Text>
          </div>

          <PaymentMethods
            selectedMethod={selectedMethod}
            onMethodSelect={setSelectedMethod}
            content={{
              card: <CardWidget plan={planId} isSixMonths={isSixMonths} />,
              sbp: (
                <SbpBanks
                  selectedBankId={selectedBankId}
                  onBankSelect={setSelectedBankId}
                />
              ),
            }}
          />

          {!isCardMethod && (
            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                size="m"
                align="center"
                fullWidth
                loading={isPaying}
                disabled={isBankRequired && !selectedBankId}
                onClick={onPay}
              >
                <Text type="s" style="regular">
                  Оплатить {formatCurrency(firstPayment)}
                </Text>
              </Button>
              {isBankRequired && !selectedBankId && (
                <Text
                  className="text-center"
                  style="regular"
                  type="xs"
                  color="#6F6F6F"
                >
                  Выберите банк, чтобы продолжить
                </Text>
              )}
            </div>
          )}

          <div className={styles.support}>
            <Text style="regular" type="s" color="#6F6F6F">
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
    </div>
  );
};

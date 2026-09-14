"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import styles from "./Checkout.module.scss";
import { CheckoutMessage } from "./components/CheckoutMessage";
import { PaymentMethods } from "./components/PaymentMethods";
import { PlanCard } from "./components/PlanCard";
import { SbpQrCode } from "./components/SbpBanks";
import {
  getDaysLabel,
  getPeriodLabel,
  SUPPORT_TELEGRAM_URL,
} from "./constants";
import { useCheckout } from "./useCheckout";

export const Checkout = () => {
  const {
    plan,
    isSixMonths,
    isLoading,
    isError,
    isFreePlan,
    isGuest,
    isPlanActive,
    isPaying,
    isPayDisabled,
    pricing,
    selectedMethod,
    onMethodSelect,
    onClose,
    onPay,
  } = useCheckout();

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

  if (!plan || !pricing) {
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

  if (isFreePlan) {
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

  if (isGuest) {
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

  if (isPlanActive) {
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
            onMethodSelect={onMethodSelect}
            content={{
              sbp: <SbpQrCode tariff={plan.id} sixMonths={isSixMonths} />,
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <PlanCard
            paymentMethod={selectedMethod}
            plan={plan}
            isSixMonths={isSixMonths}
            isPaying={isPaying}
            isPayDisabled={isPayDisabled}
            onPay={onPay}
          />

          <Text
            className="text-center"
            style="regular"
            type="xs"
            color="#6F6F6F"
          >
            {pricing.trialDays
              ? `${formatCurrency(pricing.firstPayment)} за ${getDaysLabel(pricing.trialDays)}, затем платная подписка — ${formatCurrency(pricing.periodPrice)} за ${getPeriodLabel(isSixMonths)}. `
              : `${formatCurrency(pricing.periodPrice)} за ${getPeriodLabel(isSixMonths)}. `}
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

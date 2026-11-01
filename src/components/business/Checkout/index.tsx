"use client";

import Link from "next/link";
import { formatChargeDate } from "@/components/business/PaymentStatus/utils";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format-currency";
import styles from "./Checkout.module.scss";
import { CheckoutMessage } from "./components/CheckoutMessage";
import { PaymentMethods } from "./components/PaymentMethods";
import { PlanCard } from "./components/PlanCard";
import { SbpBanksModal } from "./components/SbpBanksModal";
import { SbpQrModal } from "./components/SbpQrModal";
import { getDaysLabel, getPeriodLabel, SUPPORT_EMAIL_URL } from "./constants";
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
    isSbpQrOpen,
    isSbpBanksOpen,
    isCookieBannerShown,
    pricing,
    selectedMethod,
    onMethodSelect,
    onSbpQrClose,
    onSbpBanksClose,
    onClose,
    onPay,
  } = useCheckout();

  const pageClassName = cn(styles.page, {
    [styles.withCookieBanner]: isCookieBannerShown,
  });

  if (isLoading) {
    return (
      <div className={pageClassName}>
        <div className={styles.checkout}>
          <Skeleton isLoading height={320} />
          <Skeleton isLoading height={520} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={pageClassName}>
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
      <div className={pageClassName}>
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
      <div className={pageClassName}>
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
      <div className={pageClassName}>
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
      <div className={pageClassName}>
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
    <div className={pageClassName}>
      <div className={styles.header}>
        <Button
          className={styles.back}
          leftIcon={<Icon name="chevron-down" className={styles.backIcon} />}
          aria-label="Вернуться к тарифам"
          onClick={onClose}
        />
        <Text as="h1" type="xl" className={styles.title}>
          Выберите способ оплаты
        </Text>
      </div>

      <div className={styles.checkout}>
        <PaymentMethods
          selectedMethod={selectedMethod}
          onMethodSelect={onMethodSelect}
        />

        <div className="flex flex-col gap-4">
          <PlanCard
            paymentMethod={selectedMethod}
            plan={plan}
            isSixMonths={isSixMonths}
            isPaying={isPaying}
            onPay={onPay}
          />

          <Text
            className="text-center"
            style="regular"
            type="xs"
            color="#6F6F6F"
          >
            {pricing.trialDays
              ? `${formatCurrency(pricing.firstPayment)} — плата за пробный период ${getDaysLabel(pricing.trialDays)}. Если не отключить автопродление до ${formatChargeDate(plan.nextChargeAt)}, дальше ${formatCurrency(pricing.periodPrice)} за ${getPeriodLabel(isSixMonths)}. `
              : `${formatCurrency(pricing.periodPrice)} за ${getPeriodLabel(isSixMonths)}. `}
            Продлевается автоматически до отмены — отключить продление можно в
            любой момент в настройках. Кассовый чек придёт на вашу почту.
            Оплачивая, вы соглашаетесь с{" "}
            <Link target="_blank" href="/terms">
              офертой
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
            <Link href={SUPPORT_EMAIL_URL}>Напишите нам</Link>
          </Text>
        </div>
      </div>

      <SbpQrModal
        isOpen={isSbpQrOpen}
        tariff={plan.id}
        sixMonths={isSixMonths}
        onClose={onSbpQrClose}
      />

      <SbpBanksModal
        isOpen={isSbpBanksOpen}
        tariff={plan.id}
        sixMonths={isSixMonths}
        onClose={onSbpBanksClose}
      />
    </div>
  );
};

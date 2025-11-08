"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./Plans.module.scss";
import { getPlans, initPayment } from "@/api";
import Button from "@/components/ui/Button";
import { useState } from "react";
import Script from "next/script";
import classNames from "classnames";

const SUBSCRIPTION_BUTTON_TEXT = {
  base: "Оформить подписку",
  plus: "Открыть полный доступ",
  pro: "Активировать профессиональный",
} as Record<string, string>;

export const Plans = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(
    undefined,
  );

  const { data: plans = [] } = useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: getPlans,
  });

  const onPlanSelect = (planId: string) => {
    setSelectedPlanId(planId);

    const initConfig = {
      terminalKey: process.env.NEXT_PUBLIC_KASSA_TERMINAL_KEY, // Значение terminalKey из личного кабинета
      product: "eacq",
      features: {
        payment: {
          payMethods: ["tpay"],
          container: document.getElementById("paymentContainer"), // На странице должен существовать элемент с id="paymentContainer"
          paymentStartCallback: async (paymentType: string) => {
            // paymentType может использоваться для сбора аналитики
            const res = await initPayment({
              paymentType,
              plan: planId,
            }); // URL — это URL вашего бэкенд-сервиса, который вызовет метод «Инициировать платеж»
            return res.PaymentURL;
          },
          config: {},
        }, // Добавьте, если нужны кнопки оплаты
        // iframe: {}, // Добавьте, если нужно встроить платежную форму в iframe
        // addcardIframe: {}, // Добавьте, если нужно встроить приложение привязки карты в iframe
      },
    };

    window.PaymentIntegration.init(initConfig)
      .then(async (integration: any) => {
        console.log(integration);
        // Место для кода взаимодействия с объектом integration
      })
      .catch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div key={plan.id} className={styles.plan}>
            <h3>{plan.name}</h3>

            <h4>{plan.price} / месяц</h4>

            <div className={styles.divider} />

            <ul>
              {plan.features.map((feature, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <Button
              variant="primary"
              className={styles.selectButton}
              onClick={() => onPlanSelect(plan.id)}
            >
              {SUBSCRIPTION_BUTTON_TEXT[plan.id]}
            </Button>
          </div>
        ))}
      </div>

      {selectedPlanId && (
        <div>
          Выберите способ оплаты для плана: "
          {plans.find((p) => p.id === selectedPlanId)?.name}"
        </div>
      )}

      <div
        id="paymentContainer"
        className={classNames({
          [styles.paymentHidden]: selectedPlanId === undefined,
        })}
      ></div>

      <Script
        src="https://integrationjs.tbank.ru/integration.js"
        // onLoad={onPaymentIntegrationLoad}
        async
      ></Script>
    </div>
  );
};

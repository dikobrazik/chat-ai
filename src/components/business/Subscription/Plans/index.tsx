"use client";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import Script from "next/script";
import { useState } from "react";
import { getPlans, initPayment } from "@/api";
import { Badge } from "@/components/ui/Badge";
import Button, { type ButtonVariant } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import styles from "./Plans.module.scss";

const SUBSCRIPTION_BUTTON_TEXT = {
  base: "Текущий план",
  plus: "Начать бесплатно",
  pro: "Перейти на Pro",
} as Record<string, string>;

const SUBSCRIPTION_BUTTON_VARIANT = {
  base: "base",
  plus: "primary",
  pro: "pro",
} as Record<string, ButtonVariant>;

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
      <Text as="h1" className="text-center" style="medium" type="l">
        Попробуйте Плюс бесплатно
      </Text>
      <Tabs
        tabs={[
          {
            key: "1-month",
            label: "Месяц",
            content: (
              <div className={styles.plansContainer}>
                {plans.map((plan) => (
                  <div key={plan.id} className={styles.plan}>
                    <div className="flex justify-between">
                      <Text className="inline" as="h3" style="regular" type="l">
                        {plan.name}
                      </Text>

                      {plan.isPopular && (
                        <Badge size="m" as="span" variant="success">
                          Популярный
                        </Badge>
                      )}
                    </div>

                    <div className="gap-1">
                      <div>
                        {plan.oldPrice && (
                          <>
                            <Text
                              color="#0F8AFF3D"
                              className="inline line-through"
                              as="h4"
                              style="regular"
                              type="xl"
                            >
                              {plan.oldPrice}&nbsp;₽
                            </Text>{" "}
                          </>
                        )}
                        <Text
                          className="inline"
                          as="h4"
                          style="regular"
                          type="xl"
                        >
                          {plan.price}&nbsp;₽
                        </Text>
                        <Text
                          color="#9C9C9C"
                          as="span"
                          style="regular"
                          type="m"
                        >
                          {" "}
                          / месяц
                        </Text>
                      </div>
                      <Text color="#6F6F6F" style="regular" type="s">
                        {plan.description}
                      </Text>
                    </div>

                    <Button
                      variant={SUBSCRIPTION_BUTTON_VARIANT[plan.id]}
                      disabled={plan.isCurrentPlan}
                      size="m"
                      onClick={() => onPlanSelect(plan.id)}
                    >
                      {SUBSCRIPTION_BUTTON_TEXT[plan.id]}
                    </Button>

                    <Divider />

                    <ul>
                      <li>
                        <Text type="m">{plan.features[0]}</Text>
                      </li>
                      {plan.features.slice(1).map((feature, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ),
          },
          {
            key: "6-months",
            label: (
              <span>
                6 месяцев{" "}
                <Badge as="span" variant="danger">
                  <Text style="medium" type="xs">
                    -15%
                  </Text>
                </Badge>
              </span>
            ),
            content: (
              <div className={styles.plansContainer}>
                {plans.map((plan) => (
                  <div key={plan.id} className={styles.plan}>
                    <div className="flex justify-between">
                      <Text className="inline" as="h3" style="regular" type="l">
                        {plan.name}
                      </Text>

                      {plan.isPopular && (
                        <Badge size="m" as="span" variant="success">
                          Популярный
                        </Badge>
                      )}
                    </div>

                    <div className="gap-1">
                      <div>
                        {plan.oldPrice && (
                          <>
                            <Text
                              color="#0F8AFF3D"
                              className="inline line-through"
                              as="h4"
                              style="regular"
                              type="xl"
                            >
                              {plan.oldPrice}&nbsp;₽
                            </Text>{" "}
                          </>
                        )}
                        <Text
                          className="inline"
                          as="h4"
                          style="regular"
                          type="xl"
                        >
                          {plan.price}&nbsp;₽
                        </Text>
                        <Text
                          color="#9C9C9C"
                          as="span"
                          style="regular"
                          type="m"
                        >
                          {" "}
                          / месяц
                        </Text>
                      </div>
                      <Text color="#6F6F6F" style="regular" type="s">
                        {plan.description}
                      </Text>
                    </div>

                    <Button
                      variant={SUBSCRIPTION_BUTTON_VARIANT[plan.id]}
                      disabled={plan.isCurrentPlan}
                      size="m"
                      onClick={() => onPlanSelect(plan.id)}
                    >
                      {SUBSCRIPTION_BUTTON_TEXT[plan.id]}
                    </Button>

                    <Divider />

                    <ul>
                      <li>
                        <Text type="m">{plan.features[0]}</Text>
                      </li>
                      {plan.features.slice(1).map((feature, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      ></Tabs>

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

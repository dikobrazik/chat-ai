"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentSubscription, usePlans } from "@/api";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { SIX_MONTHS_QUERY_KEY } from "../constants";
import { Plan } from "./components/Plan";
import styles from "./Plans.module.scss";

export const Plans = () => {
  const router = useRouter();
  const { data: currentSubscription } = useCurrentSubscription();

  const { plans, sixMonthsPlans } = usePlans();

  const onPlanSelect = (planId: string, sixMonths?: boolean) => {
    router.push(
      `/plans/${planId}?${SIX_MONTHS_QUERY_KEY}=${Boolean(sixMonths)}`,
    );
  };

  const onClose = () => router.back();

  // страница открывается поверх приложения, поэтому закрывается и по Escape —
  // как это делала модалка, в которой тарифы жили раньше
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className={styles.page}>
      <Button
        variant="secondary"
        className={styles.close}
        leftIcon={<Icon name="close" />}
        aria-label="Закрыть"
        onClick={onClose}
      />

      <div className={styles.container}>
        <Text as="h1" className={styles.title} style="medium" type="xl">
          Попробуйте Плюс за 1 ₽
        </Text>

        <Tabs
          tabs={[
            {
              key: "1-month",
              label: (
                <Text style="regular" type="m">
                  Месяц
                </Text>
              ),
              content: (
                <div className={styles.plansContainer}>
                  {plans.map((plan) => (
                    <Plan
                      key={plan.id}
                      activePlan={currentSubscription?.subscription?.plan}
                      plan={plan}
                      onPlanSelect={onPlanSelect}
                    />
                  ))}
                </div>
              ),
            },
            {
              key: "6-months",
              label: (
                <span className={styles.tabLabel}>
                  <Text style="regular" type="m">
                    6 месяцев
                  </Text>
                  {sixMonthsPlans[1]?.discount && (
                    <Badge as="span" variant="danger">
                      <Text style="regular" type="xs">
                        -{sixMonthsPlans[1]?.discount}%
                      </Text>
                    </Badge>
                  )}
                </span>
              ),
              content: (
                <div className={styles.plansContainer}>
                  {sixMonthsPlans.map((plan) => (
                    <Plan
                      isSixMonths
                      key={plan.id}
                      plan={plan}
                      activePlan={currentSubscription?.subscription?.plan}
                      discount={plan?.discount}
                      onPlanSelect={onPlanSelect}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        ></Tabs>

        <Text color="#9C9C9C" style="regular" type="xs" className="text-center">
          Подписка продлевается автоматически: стоимость тарифа списывается за
          каждый следующий оплаченный период (месяц или 6 месяцев). Отключить
          продление можно в настройках в любой момент.
          <br />
          Нажимая кнопку «Оплатить», вы соглашаетесь с{" "}
          <Link className="underline" target="_blank" href="/terms">
            офертой
          </Link>
        </Text>
      </div>
    </div>
  );
};

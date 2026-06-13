"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrentSubscription, usePlans } from "@/api";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { SIX_MONTHS_QUERY_KEY } from "../constants";
import { Plan } from "./components/Plan";
import styles from "./Plans.module.scss";

export const Plans = () => {
  const router = useRouter();
  const { data: currentSubscription } = useCurrentSubscription();

  const { plans, sixMonthsPlans } = usePlans();

  const onPlanSelect = (planId: string) => {
    router.push(`/plans/${planId}?${SIX_MONTHS_QUERY_KEY}=true`);
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
                  <Plan
                    key={plan.id}
                    isActive={
                      currentSubscription?.subscription.plan === plan.id
                    }
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
              <span>
                6 месяцев{" "}
                {sixMonthsPlans[1]?.discount && (
                  <Badge as="span" variant="danger">
                    <Text style="medium" type="xs">
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
                    isActive={
                      currentSubscription?.subscription.plan === plan.id
                    }
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
        Нажимая кнопку «Оплатить», вы соглашаетесь с{" "}
        <Link className="underline" target="_blank" href="/privacy">
          офертой
        </Link>
      </Text>
    </div>
  );
};

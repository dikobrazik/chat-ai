"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPlans } from "@/api";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { Plan } from "./components/Plan";
import styles from "./Plans.module.scss";

export const Plans = () => {
  const router = useRouter();

  const { data: plans = [] } = useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: getPlans,
  });

  const onPlanSelect = (planId: string) => {
    router.push(`/plans/${planId}`);
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
                  <Plan key={plan.id} plan={plan} onPlanSelect={onPlanSelect} />
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
                  <Plan
                    isSixMonths
                    key={plan.id}
                    plan={plan}
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

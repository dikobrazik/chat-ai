"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { Plan } from "./components/Plan";
import {
  AUTO_RENEWAL_DISCLAIMER,
  CLOSE_BUTTON_LABEL,
  MONTH_TAB_KEY,
  MONTH_TAB_LABEL,
  OFFER_ACCEPTANCE_TEXT,
  OFFER_LINK_TEXT,
  PLANS_TITLE,
  SIX_MONTHS_TAB_KEY,
  SIX_MONTHS_TAB_LABEL,
} from "./constants";
import styles from "./Plans.module.scss";
import { usePlansPage } from "./usePlansPage";

export const Plans = () => {
  const {
    plans,
    sixMonthsPlans,
    sixMonthsDiscount,
    activePlan,
    onPlanSelect,
    onClose,
  } = usePlansPage();

  return (
    <div className={styles.page}>
      <Button
        variant="secondary"
        className={styles.close}
        leftIcon={<Icon name="close" />}
        aria-label={CLOSE_BUTTON_LABEL}
        onClick={onClose}
      />

      <div className={styles.container}>
        <Text as="h1" className={styles.title} style="medium" type="xl">
          {PLANS_TITLE}
        </Text>

        <Tabs
          tabs={[
            {
              key: MONTH_TAB_KEY,
              label: (
                <Text style="regular" type="m">
                  {MONTH_TAB_LABEL}
                </Text>
              ),
              content: (
                <div className={styles.plansContainer}>
                  {plans.map((plan) => (
                    <Plan
                      key={plan.id}
                      activePlan={activePlan}
                      plan={plan}
                      onPlanSelect={onPlanSelect}
                    />
                  ))}
                </div>
              ),
            },
            {
              key: SIX_MONTHS_TAB_KEY,
              label: (
                <span className={styles.tabLabel}>
                  <Text style="regular" type="m">
                    {SIX_MONTHS_TAB_LABEL}
                  </Text>
                  {sixMonthsDiscount && (
                    <Badge as="span" variant="danger">
                      <Text style="regular" type="xs">
                        -{sixMonthsDiscount}%
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
                      activePlan={activePlan}
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
          {AUTO_RENEWAL_DISCLAIMER}
          <br />
          {OFFER_ACCEPTANCE_TEXT}{" "}
          <Link className="underline" target="_blank" href="/terms">
            {OFFER_LINK_TEXT}
          </Link>
        </Text>
      </div>
    </div>
  );
};

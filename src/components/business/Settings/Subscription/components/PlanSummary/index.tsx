import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";
import { PlanDescription } from "../PlanDescription";
import { Section } from "../Section";
import styles from "./PlanSummary.module.scss";

export const PlanSummary = () => {
  const {
    planName,
    periodEnd,
    nextPaymentAmount,
    isTrial,
    isCanceled,
    isSubscribed,
  } = useSubscriptionState();

  if (!isSubscribed) {
    return (
      <Section
        withDivider={false}
        title="Бесплатный тариф"
        description="Откройте полный доступ без ограничений"
        actions={
          <Button variant="primary" align="center" as="a" href="/plans">
            Открыть&nbsp;полный&nbsp;доступ
          </Button>
        }
      >
        <PlanDescription />
      </Section>
    );
  }

  return (
    <Section
      withDivider={false}
      title={`Jonu AI ${planName}`}
      titleIcon={
        !isCanceled && (
          <Icon
            name="verify"
            size={16}
            className={styles.activeIcon}
            aria-label="Подписка активна"
          />
        )
      }
      description={
        isCanceled ? (
          `Доступно до ${periodEnd}`
        ) : (
          <>
            {isTrial && "Пробный период · "}
            Следующее списание — {periodEnd}
            {nextPaymentAmount && ` · ${nextPaymentAmount}`}
          </>
        )
      }
      actions={
        <Button variant="base" align="center" as="a" href="/plans">
          Изменить&nbsp;план
        </Button>
      }
    >
      <PlanDescription />
    </Section>
  );
};

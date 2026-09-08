import type { Plan } from "@/api/subscription";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import type { PaymentMethodId } from "../../constants";
import styles from "./PlanCard.module.scss";
import { usePlanCard } from "./usePlanCard";

type Props = {
  plan: Plan;
  paymentMethod: PaymentMethodId;
  isSixMonths: boolean;
  isPaying: boolean;
  isPayDisabled: boolean;
  onPay: () => void;
};

export const PlanCard = ({
  plan,
  paymentMethod,
  isSixMonths,
  isPaying,
  isPayDisabled,
  onPay,
}: Props) => {
  const {
    featuresTitle,
    features,
    periodPrice,
    firstPayment,
    trialDays,
    nextChargeDate,
  } = usePlanCard(plan, isSixMonths, paymentMethod);

  return (
    <div className={styles.card}>
      <div className="flex flex-col gap-2">
        <Text as="h2" type="l">
          Jonu AI {plan.name}
        </Text>
        <Text style="regular" type="s" color="#6F6F6F">
          {plan.description}
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text type="s">{featuresTitle ?? "Основные возможности"}</Text>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <Icon name="check" size={16} className={styles.featureIcon} />
              <Text style="regular" type="s">
                {feature}
              </Text>
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      <div className="flex flex-col gap-1">
        <div className={styles.row}>
          <Text type="m">К оплате сегодня</Text>
          <Text type="m">{formatCurrency(firstPayment)}</Text>
        </div>
        <div className={styles.row}>
          <Text style="regular" type="s" color="#6F6F6F">
            {nextChargeDate ??
              `После ${trialDays ? getDaysGenitiveLabel(trialDays) : getPeriodLabel(isSixMonths)}`}
          </Text>
          <Text style="regular" type="s" color="#6F6F6F">
            {formatCurrency(periodPrice)}
          </Text>
        </div>
      </div>

      <Button
        variant="primary"
        size="m"
        align="center"
        fullWidth
        loading={isPaying}
        disabled={isPayDisabled}
        onClick={onPay}
      >
        <Text type="s" style="regular">
          {trialDays
            ? "Активировать пробную версию"
            : `Оплатить ${formatCurrency(firstPayment)}`}
        </Text>
      </Button>
    </div>
  );
};

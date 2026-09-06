import type { Plan } from "@/api/subscription";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import { getDaysGenitiveLabel, getPeriodLabel } from "../../constants";
import styles from "./PlanCard.module.scss";

type Props = {
  plan: Plan;
  isSixMonths: boolean;
  isPaying: boolean;
  isPayDisabled: boolean;
  onPay: () => void;
};

export const PlanCard = ({
  plan,
  isSixMonths,
  isPaying,
  isPayDisabled,
  onPay,
}: Props) => {
  const { periodPrice, firstPayment, trialDays } = getPlanPricing(
    plan,
    isSixMonths,
  );

  // состав тарифа берём из /subscription/plans — тот же источник, что и у
  // карточек на /plans: правки текстов на бэке меняют оба экрана
  const [featuresTitle, ...features] = plan.features;

  // дату первого списания отдаёт бэк; пока поля нет — обходимся сроком
  const nextChargeLabel = plan.nextChargeAt
    ? new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
      }).format(new Date(plan.nextChargeAt))
    : `После ${trialDays ? getDaysGenitiveLabel(trialDays) : getPeriodLabel(isSixMonths)}`;

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
            {nextChargeLabel}
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

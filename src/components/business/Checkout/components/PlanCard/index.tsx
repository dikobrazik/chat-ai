import type { Plan } from "@/api/subscription";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import {
  getBillingLabel,
  getDaysLabel,
  getEveryPeriodLabel,
  getPeriodLabel,
} from "../../constants";
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
  const { periodPrice, fullPeriodPrice, firstPayment, trialDays } =
    getPlanPricing(plan, isSixMonths);

  const [featuresTitle, ...features] = plan.features;

  // дату первого списания отдаёт бэк; пока поля нет — обходимся сроком
  const chargeDate = plan.nextChargeAt
    ? `, ${new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date(plan.nextChargeAt))}`
    : "";

  const rows = [
    {
      label: `Подписка ${getBillingLabel(isSixMonths)}`,
      value: formatCurrency(fullPeriodPrice),
    },
  ];

  if (fullPeriodPrice !== periodPrice) {
    rows.push({
      label: `Скидка ${plan.discount}%`,
      value: `−${formatCurrency(fullPeriodPrice - periodPrice)}`,
    });
  }

  if (trialDays) {
    rows.push({
      label: `Пробный период, ${getDaysLabel(trialDays)}`,
      value: formatCurrency(firstPayment),
    });
  }

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

      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <Text style="regular" type="s" color="#6F6F6F">
              {row.label}
            </Text>
            <Text style="regular" type="s" color="#6F6F6F">
              {row.value}
            </Text>
          </div>
        ))}
        <div className={styles.row}>
          <Text type="m">К оплате сегодня</Text>
          <Text type="m">{formatCurrency(firstPayment)}</Text>
        </div>
      </div>

      <div className="flex flex-col gap-3">
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

        {/* сумма и периодичность будущих списаний обязаны быть у кнопки —
            требование 376-ФЗ, общей ссылки на оферту недостаточно.
            Дату первого списания отдаёт бэк; пока поля нет — только срок */}
        <Text className="text-center" style="regular" type="xs" color="#6F6F6F">
          {trialDays
            ? `Следующее списание через ${getDaysLabel(trialDays)}${chargeDate} — ${formatCurrency(periodPrice)}, далее ${formatCurrency(periodPrice)} ${getEveryPeriodLabel(isSixMonths)}`
            : `Следующее списание${chargeDate || ` через ${getPeriodLabel(isSixMonths)}`} — ${formatCurrency(periodPrice)}, далее ${getEveryPeriodLabel(isSixMonths)}`}
        </Text>
      </div>
    </div>
  );
};

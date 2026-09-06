import type { Plan } from "@/api/subscription";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import { Badge } from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import {
  getDaysLabel,
  getEveryPeriodLabel,
  getPeriodLabel,
} from "../../constants";
import styles from "./OrderSummary.module.scss";

const SIX_MONTHS_INPUT_ID = "six-months-switch";

const formatChargeDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(
    new Date(date),
  );

type Props = {
  plan: Plan;
  isSixMonths: boolean;
  sixMonthsDiscount?: number;
  /** у шестимесячного тарифа нет пробного периода, а у месячного есть */
  losesTrial?: boolean;
  onSixMonthsChange: (isSixMonths: boolean) => void;
};

export const OrderSummary = ({
  plan,
  isSixMonths,
  sixMonthsDiscount,
  losesTrial,
  onSixMonthsChange,
}: Props) => {
  const {
    monthlyPrice,
    periodPrice,
    fullPeriodPrice,
    firstPayment,
    trialDays,
  } = getPlanPricing(plan, isSixMonths);

  const renewalStep = {
    title: `Дальше ${getEveryPeriodLabel(isSixMonths)}`,
    description: `${formatCurrency(periodPrice)}, пока вы не отключите продление`,
  };

  const steps = trialDays
    ? [
        {
          title: "Сегодня",
          description: `Полный доступ к тарифу «${plan.name}». Спишется ${formatCurrency(firstPayment)}`,
        },
        {
          title: `Через ${getDaysLabel(trialDays)}`,
          description: `Спишется ${formatCurrency(periodPrice)} — первый оплаченный ${getPeriodLabel(isSixMonths)}`,
        },
        renewalStep,
      ]
    : [
        {
          title: "Сегодня",
          description: `Полный доступ к тарифу «${plan.name}». Спишется ${formatCurrency(periodPrice)}`,
        },
        renewalStep,
      ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Text as="h1" type="xl">
          Выберите способ оплаты
        </Text>
        <Text style="regular" type="m" color="#6F6F6F">
          Jonu AI {plan.name} — {plan.description}
        </Text>
      </div>

      <div className={styles.priceRow}>
        <div className="flex items-baseline gap-2">
          <Text as="span" type="xl">
            {formatCurrency(monthlyPrice)}
          </Text>
          <Text as="span" style="regular" type="m" color="#9C9C9C">
            в месяц
          </Text>
        </div>
        {isSixMonths && (
          <Text style="regular" type="s" color="#6F6F6F">
            <Text
              as="span"
              style="regular"
              type="s"
              className={styles.strikethrough}
              color="#9C9C9C"
            >
              {formatCurrency(fullPeriodPrice)}
            </Text>{" "}
            {formatCurrency(periodPrice)} за 6 месяцев
          </Text>
        )}
      </div>

      {/* обёртка — div, а не label: Switch уже оборачивает свой input в label,
          вложенные label — невалидная разметка */}
      <div className={styles.sixMonths}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label htmlFor={SIX_MONTHS_INPUT_ID}>
              <Text type="m">Оплатить за 6 месяцев</Text>
            </label>
            {!!sixMonthsDiscount && (
              <Badge size="s" as="span" variant="danger">
                <Text style="medium" type="xs">
                  −{sixMonthsDiscount}%
                </Text>
              </Badge>
            )}
          </div>
          <Text style="regular" type="s" color="#6F6F6F">
            {losesTrial && !isSixMonths
              ? "Одно списание вместо шести, но без пробного периода"
              : "Одно списание вместо шести"}
          </Text>
        </div>
        <Switch
          id={SIX_MONTHS_INPUT_ID}
          checked={isSixMonths}
          onChange={(event) => onSixMonthsChange(event.target.checked)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Text type="m">Как проходит подписка</Text>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepMarker} aria-hidden="true" />
              <Text as="div" type="s">
                {step.title}
              </Text>
              <Text as="div" style="regular" type="s" color="#6F6F6F">
                {step.description}
              </Text>
            </li>
          ))}
        </ol>
      </div>

      {/* дату первого полного списания отдаёт бэк; пока поля нет — строки нет */}
      {plan.nextChargeAt && (
        <div className={styles.nextCharge}>
          <Icon name="info-circle" className={styles.nextChargeIcon} />
          <Text style="regular" type="s">
            Следующее списание: {formatChargeDate(plan.nextChargeAt)} —{" "}
            {formatCurrency(periodPrice)}
          </Text>
        </div>
      )}
    </div>
  );
};

import type { Plan as PlanType, Subscription } from "@/api/subscription";
import { Badge } from "@/components/ui/Badge";
import Button, { type ButtonVariant } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { PLANS_MAP } from "@/constants/plans";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format-currency";
import styles from "./Plan.module.scss";

const CURRENT_PLAN_TEXT = "Текущий план";

const SUBSCRIPTION_BUTTON_TEXT = {
  [PLANS_MAP.base]: "Прошлый век",
  [PLANS_MAP.plus]: "Перейти на Plus",
  [PLANS_MAP.pro]: "Перейти на Pro",
} as Record<string, string>;

const SUBSCRIPTION_BUTTON_VARIANT = {
  [PLANS_MAP.base]: "base",
  [PLANS_MAP.plus]: "primary",
  [PLANS_MAP.pro]: "pro",
} as Record<string, ButtonVariant>;

type PlanProps = {
  isSixMonths?: boolean;
  plan: PlanType;
  activePlan?: Subscription["plan"];
  discount?: number;
  onPlanSelect: (planId: string, sixMonths?: boolean) => void;
};

export const Plan = ({
  isSixMonths,
  activePlan,
  discount,
  plan,
  onPlanSelect,
}: PlanProps) => {
  const isActive = activePlan === plan.id;
  let buttonText = isActive
    ? CURRENT_PLAN_TEXT
    : SUBSCRIPTION_BUTTON_TEXT[plan.id];

  const discountMultiplier = discount ? (100 - discount) / 100 : 1;
  let finalPrice = plan.price * discountMultiplier;

  if (plan.freeDays) {
    finalPrice = 1;
    buttonText = "Попробовать за 1 ₽";
  }

  if (activePlan === PLANS_MAP.pro && plan.id === PLANS_MAP.plus) {
    buttonText = "Пройденный шаг";
  }

  return (
    <div key={plan.id} className={cn(styles.plan, styles[`plan-${plan.id}`])}>
      <div
        className={cn(
          styles.header,
          "flex justify-between items-center gap-3 h-7",
        )}
      >
        <Text as="h3" style="regular" type="l">
          {plan.name}
        </Text>

        {plan.isPopular && (
          <Badge size="m" as="span" variant="success">
            <Text style="regular" type="xs">
              Популярный
            </Text>
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          {((isSixMonths && plan.price > 0) || finalPrice !== plan.price) && (
            <Text
              color="#0F8AFF3D"
              className={styles.oldPrice}
              as="span"
              type="xl"
            >
              {formatCurrency(plan.price)}
            </Text>
          )}
          <Text as="span" type="xl">
            {formatCurrency(finalPrice)}
          </Text>
          <Text color="#9C9C9C" as="span" style="regular" type="s">
            / {plan.freeDays ? `в течение ${plan.freeDays} дней` : "месяц"}
          </Text>
        </div>
        <Text color="#6F6F6F" style="regular" type="s">
          {isSixMonths && finalPrice > 0
            ? `${formatCurrency(finalPrice * 6)} за 6 месяцев`
            : plan.description}
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant={SUBSCRIPTION_BUTTON_VARIANT[plan.id]}
          disabled={isActive}
          size="m"
          align="center"
          fullWidth
          onClick={() => onPlanSelect(plan.id, isSixMonths)}
        >
          {buttonText}
        </Button>

        {plan.isPopular && (
          <div className="flex items-center justify-center gap-2">
            <Icon name="verify" className={styles.cancelIcon} />
            <Text style="regular" type="xs">
              Можно отменить в любое время
            </Text>
          </div>
        )}
      </div>

      <Divider />

      <div className="flex flex-col gap-3">
        <Text type="s">{plan.features[0]}</Text>
        <div className="flex flex-col gap-2">
          {plan.features.slice(1).map((feature) => (
            <Text key={feature} style="regular" type="s">
              {feature}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};

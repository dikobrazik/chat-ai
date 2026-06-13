import type { Plan as PlanType } from "@/api/subscription";
import { Badge } from "@/components/ui/Badge";
import Button, { type ButtonVariant } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { List, ListItem } from "@/components/ui/List";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import styles from "./Plan.module.scss";

const CURRENT_PLAN_TEXT = "Текущий план";

const SUBSCRIPTION_BUTTON_TEXT = {
  base: "Прошлый век",
  plus: "Начать бесплатно",
  pro: "Перейти на Pro",
} as Record<string, string>;

const SUBSCRIPTION_BUTTON_VARIANT = {
  base: "base",
  plus: "primary",
  pro: "pro",
} as Record<string, ButtonVariant>;

type PlanProps = {
  isSixMonths?: boolean;
  plan: PlanType;
  isActive?: boolean;
  discount?: number;
  onPlanSelect: (planId: string, sixMonths?: boolean) => void;
};

export const Plan = ({
  isSixMonths,
  isActive,
  discount,
  plan,
  onPlanSelect,
}: PlanProps) => {
  const discountMultiplier = discount ? (100 - discount) / 100 : 1;
  let finalPrice = plan.price * discountMultiplier;

  if (plan.freeDays) {
    finalPrice = 1;
  }

  return (
    <div key={plan.id} className={styles.plan}>
      <div className="flex justify-between items-start h-7">
        <Text className="inline" as="h3" style="regular" type="l">
          {plan.name}
        </Text>

        {plan.isPopular && (
          <Badge size="m" as="span" variant="success">
            <Text type="xs">Популярный</Text>
          </Badge>
        )}
      </div>

      <div className="gap-1 h-14">
        <div>
          {((isSixMonths && plan.price > 0) || finalPrice !== plan.price) && (
            <>
              <Text
                color="#0F8AFF3D"
                className="inline line-through"
                as="h4"
                style="regular"
                type="xl"
              >
                {formatCurrency(plan.price)}
              </Text>{" "}
            </>
          )}
          <Text className="inline" as="h4" style="regular" type="xl">
            {formatCurrency(finalPrice)}
          </Text>
          <Text color="#9C9C9C" as="span" style="regular" type="m">
            {" "}
            / {plan.freeDays ? `в течение ${plan.freeDays} дней` : "месяц"}
          </Text>
        </div>
        <Text color="#6F6F6F" style="regular" type="s">
          {isSixMonths && finalPrice > 0 ? (
            <>
              <Text color="black">{formatCurrency(finalPrice * 6)}</Text> за 6
              месяцев
            </>
          ) : (
            plan.description
          )}
        </Text>
      </div>

      <Button
        variant={SUBSCRIPTION_BUTTON_VARIANT[plan.id]}
        disabled={isActive}
        size="m"
        onClick={() => onPlanSelect(plan.id, isSixMonths)}
      >
        {isActive ? CURRENT_PLAN_TEXT : SUBSCRIPTION_BUTTON_TEXT[plan.id]}
      </Button>

      <Divider />

      <List>
        <ListItem>
          <Text type="m">{plan.features[0]}</Text>
        </ListItem>
        {plan.features.slice(1).map((feature, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <ListItem key={index}>{feature}</ListItem>
        ))}
      </List>
    </div>
  );
};

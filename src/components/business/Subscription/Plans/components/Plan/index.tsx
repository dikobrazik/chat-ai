import type { Plan as PlanType } from "@/api/subscription";
import { Badge } from "@/components/ui/Badge";
import Button, { type ButtonVariant } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { List, ListItem } from "@/components/ui/List";
import { Text } from "@/components/ui/Text";
import { formatCurrency } from "@/utils/format-currency";
import styles from "./Plan.module.scss";

const SUBSCRIPTION_BUTTON_TEXT = {
  base: "Текущий план",
  plus: "Начать бесплатно",
  pro: "Перейти на Pro",
} as Record<string, string>;

const SUBSCRIPTION_BUTTON_VARIANT = {
  base: "base",
  plus: "primary",
  pro: "pro",
} as Record<string, ButtonVariant>;

export const Plan = ({
  isSixMonths,
  plan,
  onPlanSelect,
}: {
  isSixMonths?: boolean;
  plan: PlanType;
  onPlanSelect: (planId: string) => void;
}) => {
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
          {(isSixMonths || plan.oldPrice) && (
            <>
              <Text
                color="#0F8AFF3D"
                className="inline line-through"
                as="h4"
                style="regular"
                type="xl"
              >
                {formatCurrency(
                  isSixMonths ? plan.price : (plan.oldPrice ?? 0),
                )}
              </Text>{" "}
            </>
          )}
          <Text className="inline" as="h4" style="regular" type="xl">
            {formatCurrency(isSixMonths ? plan.sixMonthsPrice : plan.price)}
          </Text>
          <Text color="#9C9C9C" as="span" style="regular" type="m">
            {" "}
            / месяц
          </Text>
        </div>
        <Text color="#6F6F6F" style="regular" type="s">
          {isSixMonths ? (
            <>
              <Text color="black">
                {formatCurrency(plan.sixMonthsPrice * 6)}
              </Text>{" "}
              за 6 месяцев
            </>
          ) : (
            plan.description
          )}
        </Text>
      </div>

      <Button
        variant={SUBSCRIPTION_BUTTON_VARIANT[plan.id]}
        disabled={plan.isCurrentPlan}
        size="m"
        onClick={() => onPlanSelect(plan.id)}
      >
        {SUBSCRIPTION_BUTTON_TEXT[plan.id]}
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

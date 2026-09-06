import type { Plan as PlanType, Subscription } from "@/api/subscription";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { CANCEL_ANYTIME_TEXT, POPULAR_BADGE_TEXT } from "./constants";
import styles from "./Plan.module.scss";
import { usePlan } from "./usePlan";

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
  const {
    isActive,
    buttonText,
    buttonVariant,
    price,
    oldPrice,
    period,
    subtitle,
    featuresTitle,
    features,
  } = usePlan({ plan, activePlan, discount, isSixMonths });

  return (
    <div className={cn(styles.plan, styles[`plan-${plan.id}`])}>
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
              {POPULAR_BADGE_TEXT}
            </Text>
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          {oldPrice && (
            <Text
              color="#0F8AFF3D"
              className={styles.oldPrice}
              as="span"
              type="xl"
            >
              {oldPrice}
            </Text>
          )}
          <Text as="span" type="xl">
            {price}
          </Text>
          <Text color="#9C9C9C" as="span" style="regular" type="s">
            / {period}
          </Text>
        </div>
        <Text color="#6F6F6F" style="regular" type="s">
          {subtitle}
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant={buttonVariant}
          disabled={isActive}
          size="m"
          align="center"
          fullWidth
          onClick={() => onPlanSelect(plan.id, isSixMonths)}
        >
          {buttonText}
        </Button>

        <div
          aria-hidden={!plan.isPopular}
          className={cn("flex items-center justify-center gap-2", {
            [styles.cancelNoteHidden]: !plan.isPopular,
          })}
        >
          <Icon name="verify" className={styles.cancelIcon} />
          <Text style="regular" type="xs">
            {CANCEL_ANYTIME_TEXT}
          </Text>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-3">
        <Text type="s">{featuresTitle}</Text>
        <div className="flex flex-col gap-2">
          {features.map((feature) => (
            <Text key={feature} style="regular" type="s">
              {feature}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};

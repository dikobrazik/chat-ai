import type { Plan as PlanType, Subscription } from "@/api/subscription";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { formatCompactNumber, formatNumber } from "@/utils/format-number";
import { pluralize } from "@/utils/pluralize";
import { Benefit } from "./Benefit";
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
    isDisabled,
    isCancelable,
    buttonText,
    buttonVariant,
    price,
    oldPrice,
    period,
    subtitle,
    tokensLimit,
    isDailyLimit,
    dialogsUpTo,
    imagesUpTo,
    fastModelsCount,
    advancedModelsCount,
    heavyModelsCount,
  } = usePlan({ plan, activePlan, discount, isSixMonths });

  const limitPeriod = isDailyLimit ? <>в&nbsp;день</> : <>в&nbsp;месяц</>;

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
          disabled={isDisabled}
          size="m"
          align="center"
          fullWidth
          onClick={() => onPlanSelect(plan.id, isSixMonths)}
        >
          {buttonText}
        </Button>

        <div
          aria-hidden={!isCancelable}
          className={cn("flex items-center justify-center gap-2", {
            [styles.cancelNoteHidden]: !isCancelable,
          })}
        >
          <Icon name="verify" className={styles.cancelIcon} />
          <Text style="regular" type="xs">
            {CANCEL_ANYTIME_TEXT}
          </Text>
        </div>
      </div>

      <Divider />

      <ul className={styles.benefits}>
        {tokensLimit && (
          <Benefit icon="coin">
            <Text type="s">{formatCompactNumber(tokensLimit)}</Text>
            &nbsp;jonu-токенов {limitPeriod}
          </Benefit>
        )}
        {dialogsUpTo && (
          <Benefit icon="messages">
            <Text type="s">До&nbsp;{formatNumber(dialogsUpTo)}</Text>&nbsp;
            {pluralize(dialogsUpTo, ["диалога", "диалогов", "диалогов"])}
            {isDailyLimit && <> в&nbsp;день</>}
          </Benefit>
        )}
        {imagesUpTo && (
          <Benefit icon="gallery">
            <Text type="s">До&nbsp;{formatNumber(imagesUpTo)}</Text>&nbsp;
            {pluralize(imagesUpTo, [
              "изображения",
              "изображений",
              "изображений",
            ])}
            {isDailyLimit && <> в&nbsp;день</>}
          </Benefit>
        )}
        <Benefit icon="paperclip">Загрузка фото и файлов</Benefit>
        {fastModelsCount && (
          <Benefit icon="speedometer">
            <Text type="s">{fastModelsCount}</Text>&nbsp;
            {pluralize(fastModelsCount, [
              "быстрая модель",
              "быстрые модели",
              "быстрых моделей",
            ])}
          </Benefit>
        )}
        {advancedModelsCount && (
          <Benefit icon="magic-star">
            <Text type="s">{advancedModelsCount}</Text>&nbsp;
            {pluralize(advancedModelsCount, [
              "продвинутая модель",
              "продвинутые модели",
              "продвинутых моделей",
            ])}
          </Benefit>
        )}
        {heavyModelsCount && (
          <Benefit icon="cpu">
            <Text type="s">{heavyModelsCount}</Text>&nbsp;
            {pluralize(heavyModelsCount, [
              "тяжёлая модель",
              "тяжёлые модели",
              "тяжёлых моделей",
            ])}
          </Benefit>
        )}
      </ul>
    </div>
  );
};

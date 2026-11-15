import type { PromptLimit } from "@/api";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { PLANS_MAP } from "@/constants/plans";
import { useTooManyRequests } from "./hooks/useTooManyRequests";
import { LimitResetTime } from "./LimitResetTime";

type TooManyRequestsProps = {
  limit?: PromptLimit;
  onClose?: () => void;
};

export const TooManyRequests = ({ limit, onClose }: TooManyRequestsProps) => {
  const {
    isGuest,
    isLoading,
    currentPlan,
    isTrialLimit,
    isImageLimit,
    plusPrice,
    proPrice,
    trialDays,
    trialPrice,
  } = useTooManyRequests(limit);

  const resetTime = limit?.resetAt ? (
    <LimitResetTime resetAt={limit.resetAt} />
  ) : null;

  if (isGuest) {
    return (
      <Banner
        title="Вы достигли лимита использования"
        description="Войдите, чтобы увеличить свой лимит сообщений"
        direction="row"
        onClose={onClose}
        action={
          <Button variant="primary" href="/login" align="center">
            <Text type="s" as="div">
              Зарегистрироваться
            </Text>
          </Button>
        }
      />
    );
  }

  if (isLoading) return null;

  if (currentPlan === PLANS_MAP.pro) {
    return (
      <Banner
        title="Вы достигли лимита запросов"
        description={resetTime ?? "Попробуйте отправить сообщение позже"}
        direction="row"
        onClose={onClose}
      />
    );
  }

  if (isTrialLimit) {
    return (
      <Banner
        title="Вы достигли дневного лимита пробного периода"
        description={
          <>
            {resetTime} Дневной лимит действует только в пробном периоде — после
            оплаты месяца его не будет
          </>
        }
        direction="row"
        onClose={onClose}
      />
    );
  }

  if (currentPlan === PLANS_MAP.plus) {
    return (
      <Banner
        title="Вы достигли лимита тарифа Плюс"
        description={
          <>
            {resetTime}{" "}
            {proPrice &&
              `В тарифе Профессиональный можно продолжить сейчас за ${proPrice} в месяц`}
          </>
        }
        direction="row"
        onClose={onClose}
        action={
          <Button variant="primary" href="/plans" align="center">
            <Text type="s" as="div">
              Попробовать
            </Text>
          </Button>
        }
      />
    );
  }

  return (
    <Banner
      title={
        isImageLimit
          ? "Вы достигли лимита изображений на сегодня"
          : "Вы достигли лимита бесплатного тарифа"
      }
      description={
        <>
          {resetTime}{" "}
          {plusPrice &&
            (trialDays
              ? `В Плюсе можно продолжить сейчас: ${trialDays} за ${trialPrice}, затем ${plusPrice} в месяц`
              : `В Плюсе можно продолжить сейчас за ${plusPrice} в месяц`)}
        </>
      }
      direction="row"
      onClose={onClose}
      action={
        <Button variant="primary" href="/plans" align="center">
          <Text type="s" as="div">
            {trialDays ? `Попробовать за ${trialPrice}` : "Перейти на Плюс"}
          </Text>
        </Button>
      }
    />
  );
};

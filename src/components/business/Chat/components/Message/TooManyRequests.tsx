import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { PLANS_MAP } from "@/constants/plans";
import { useTooManyRequests } from "./hooks/useTooManyRequests";

type TooManyRequestsProps = {
  resetTime: string;
  onClose?: () => void;
};

export const TooManyRequests = ({
  resetTime,
  onClose,
}: TooManyRequestsProps) => {
  const {
    isGuest,
    isLoading,
    currentPlan,
    plusPrice,
    proPrice,
    trialDays,
    trialPrice,
  } = useTooManyRequests();

  if (isGuest) {
    return (
      <Banner
        title="Вы достигли лимита использования без регистрации"
        description="Зарегистрируйтесь, чтобы увеличить свой лимит сообщений"
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
        description={
          resetTime
            ? `Обновится в ${resetTime}`
            : "Попробуйте отправить сообщение позже"
        }
        direction="row"
        onClose={onClose}
      />
    );
  }

  if (currentPlan === PLANS_MAP.plus) {
    return (
      <Banner
        title="Вы достигли лимита плана Плюс"
        description={
          <>
            {resetTime && `Обновится в ${resetTime}. `}
            {proPrice && `Не ждите — перейдите на Про за ${proPrice} в месяц`}
          </>
        }
        direction="row"
        onClose={onClose}
        action={
          <Button variant="primary" href="/plans" align="center">
            <Text type="s" as="div">
              Перейти на Про
            </Text>
          </Button>
        }
      />
    );
  }

  return (
    <Banner
      title="Вы достигли лимита бесплатного плана"
      description={
        <>
          {resetTime && `Обновится в ${resetTime}. `}
          {plusPrice &&
            (trialDays
              ? `Не ждите — попробуйте Плюс: ${trialDays} за ${trialPrice}, затем ${plusPrice} в месяц`
              : `Не ждите — перейдите на Плюс за ${plusPrice} в месяц`)}
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

import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";

export const SubscriptionBanner = () => {
  const {
    planName,
    periodEnd,
    nextPaymentAmount,
    isTrial,
    isCanceled,
    isSubscribed,
  } = useSubscriptionState();

  if (!isSubscribed) {
    return (
      <Banner
        title="Откройте полный доступ без ограничений"
        description="Создавайте быстрее — без лимитов и ожиданий"
        action={
          <Button variant="primary" as="a" href="/plans">
            Открыть&nbsp;полный&nbsp;доступ
          </Button>
        }
        direction="row"
      />
    );
  }

  return (
    <Banner
      title={`Jonu AI ${planName}${isTrial ? " · пробный период" : ""}`}
      description={
        isCanceled
          ? `Доступно до ${periodEnd}`
          : `Следующее списание — ${periodEnd}${nextPaymentAmount ? ` · ${nextPaymentAmount}` : ""}`
      }
      action={
        <Button variant="secondary" as="a" href="/plans">
          Изменить&nbsp;план
        </Button>
      }
      direction="row"
    />
  );
};

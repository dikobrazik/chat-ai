import { useQuery } from "@tanstack/react-query";
import { getPlans, getSubscription } from "@/api";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { useToggle } from "@/hooks/useToggle";
import { CancelSubscriptionModal } from "./CancelSubscriptionModal";

export const SubscriptionBanner = () => {
  const { data } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
  });
  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const subscription = data?.subscription;
  const activePlan = plansData?.find((plan) => plan.id === subscription?.plan);

  const { active, toggle } = useToggle();

  if (
    !subscription ||
    subscription.plan === "base" ||
    subscription.status !== "active"
  ) {
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
    <>
      <Banner
        title={`Jonu AI ${activePlan?.name ?? ""}`}
        description={`Ваш план будет автоматически продлён ${new Date(subscription?.current_period_end).toLocaleDateString() ?? ""}`}
        action={
          <Popover
            position="bottom"
            align="end"
            Trigger={(props) => (
              <Button
                {...props}
                variant="secondary"
                rightIcon={<Icon name="chevron-down" />}
              >
                Управление
              </Button>
            )}
          >
            <div className="flex flex-col gap-2">
              <Button leftIcon={<Icon name="setting" />}>Обновить тариф</Button>
              <Button
                variant="danger"
                leftIcon={<Icon name="close-square" />}
                onClick={toggle}
              >
                Отменить подписку
              </Button>
            </div>
          </Popover>
        }
        direction="row"
      />

      <CancelSubscriptionModal isOpen={active} onClose={toggle} />
    </>
  );
};

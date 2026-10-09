import { useCurrentPlan, useCurrentSubscription, usePlans } from "@/api";
import { formatKopecks } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";

export const useSubscriptionState = () => {
  const { data: subscription } = useCurrentSubscription();
  const { data: plan } = useCurrentPlan();
  const { plans } = usePlans();

  const isPaidPlan = Boolean(subscription) && subscription?.plan !== "base";
  const isActive = isPaidPlan && subscription?.status === "active";
  const isCanceled = isPaidPlan && subscription?.status === "canceled";

  return {
    plan: isPaidPlan ? plan : plans.find((item) => item.id === "base"),
    planName: plan?.name ?? "",
    periodEnd: subscription ? formatDate(subscription.current_period_end) : "",
    nextPaymentAmount: subscription?.next_payment_amount
      ? formatKopecks(subscription.next_payment_amount)
      : "",
    isTrial: Boolean(subscription?.is_trial),
    isActive,
    isCanceled,
    isSubscribed: isActive || isCanceled,
  };
};

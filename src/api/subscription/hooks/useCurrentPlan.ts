import { useCurrentSubscription } from "./useCurrentSubscription";
import { usePlans } from "./usePlans";

export const useCurrentPlan = () => {
  const {
    data: subscription,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
  } = useCurrentSubscription();

  const {
    plans,
    isLoading: isPlansLoading,
    isError: isPlansError,
  } = usePlans();

  return {
    data: plans.find((plan) => plan.id === subscription?.plan),
    isLoading: isSubscriptionLoading || isPlansLoading,
    isError: isSubscriptionError || isPlansError,
  };
};

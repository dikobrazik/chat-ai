import type { PromptLimit } from "@/api";
import { useCurrentSubscription, usePlans } from "@/api/subscription";
import { useProfile } from "@/api/user";
import { TRIAL_PRICE } from "@/components/business/Subscription/Plans/components/Plan/constants";
import { PLANS_MAP } from "@/constants/plans";
import { PLAN_BY_USER_STATUS } from "@/constants/user";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { formatCurrency } from "@/utils/format-currency";
import { formatDays } from "@/utils/format-time";

export const useTooManyRequests = (limit?: PromptLimit) => {
  const { isGuest } = useAuthContext();
  const { data: profile, isLoading: isProfileLoading } = useProfile({
    enabled: !isGuest,
  });
  const { data: subscription } = useCurrentSubscription({
    enabled: !isGuest,
  });
  const { plans, isLoading: isPlansLoading } = usePlans();

  const currentPlan =
    PLAN_BY_USER_STATUS[profile?.status ?? ""] ?? PLANS_MAP.base;
  const plusPlan = plans.find(({ id }) => id === PLANS_MAP.plus);
  const proPlan = plans.find(({ id }) => id === PLANS_MAP.pro);

  return {
    isGuest,
    isLoading: isProfileLoading || isPlansLoading,
    currentPlan,
    isTrialLimit:
      currentPlan === PLANS_MAP.plus && Boolean(subscription?.is_trial),
    plusPrice: plusPlan && formatCurrency(plusPlan.price),
    proPrice: proPlan && formatCurrency(proPlan.price),
    trialDays: plusPlan?.freeDays ? formatDays(plusPlan.freeDays) : "",
    trialPrice: formatCurrency(TRIAL_PRICE),
  };
};

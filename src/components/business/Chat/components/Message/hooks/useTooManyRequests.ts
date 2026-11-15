import type { PromptLimit } from "@/api";
import { usePlans } from "@/api/subscription";
import { useProfile } from "@/api/user";
import { LIMIT_REASON } from "@/components/business/Chat/hooks/constants";
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
      currentPlan === PLANS_MAP.plus && limit?.reason === LIMIT_REASON.daily,
    plusPrice: plusPlan && formatCurrency(plusPlan.price),
    proPrice: proPlan && formatCurrency(proPlan.price),
    trialDays: plusPlan?.freeDays ? formatDays(plusPlan.freeDays) : "",
    trialPrice: formatCurrency(TRIAL_PRICE),
  };
};

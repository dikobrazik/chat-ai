import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentSubscription, usePlans as usePlansQuery } from "@/api";
import { PLANS_MAP } from "@/constants/plans";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { saveAuthRedirect } from "@/utils/auth-redirect";
import { getCheckoutPath, PLANS_PATH } from "../constants";
import { SIX_MONTHS_TARIFF_PLANS, TARIFF_PLANS } from "./constants";

export const usePlansPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isGuest } = useAuthContext();

  const { data: currentSubscription } = useCurrentSubscription();
  const { plans: userPlans } = usePlansQuery();

  const plans = TARIFF_PLANS.map((plan) => ({
    ...plan,
    freeDays: isGuest
      ? plan.freeDays
      : userPlans.find(({ id }) => id === plan.id)?.freeDays,
  }));
  const sixMonthsPlans = SIX_MONTHS_TARIFF_PLANS;

  const onPlanSelect = (planId: string, sixMonths?: boolean) => {
    const checkoutPath = getCheckoutPath(planId, sixMonths);

    if (isGuest) {
      const isFreePlan =
        (sixMonths ? sixMonthsPlans : plans).find((plan) => plan.id === planId)
          ?.price === 0;

      saveAuthRedirect(isFreePlan ? "/" : checkoutPath);
      router.push("/login");

      return;
    }

    router.push(checkoutPath);
  };

  const onClose = () => router.back();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && pathname === PLANS_PATH) {
        router.back();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router, pathname]);

  return {
    plans,
    sixMonthsPlans,
    sixMonthsDiscount: sixMonthsPlans.find((plan) => plan.discount)?.discount,
    hasTokenLimits: plans.some((plan) => plan.tokens || plan.dailyTokens),
    activePlan:
      currentSubscription?.plan ?? (isGuest ? undefined : PLANS_MAP.base),
    onPlanSelect,
    onClose,
  };
};

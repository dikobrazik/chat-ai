import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentSubscription, usePlans as usePlansQuery } from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "../constants";

export const usePlansPage = () => {
  const router = useRouter();

  const { data: currentSubscription } = useCurrentSubscription();
  const { plans, sixMonthsPlans } = usePlansQuery();

  const onPlanSelect = (planId: string, sixMonths?: boolean) => {
    router.push(
      `/plans/${planId}?${SIX_MONTHS_QUERY_KEY}=${Boolean(sixMonths)}`,
    );
  };

  const onClose = () => router.back();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return {
    plans,
    sixMonthsPlans,
    sixMonthsDiscount: sixMonthsPlans.find((plan) => plan.discount)?.discount,
    activePlan: currentSubscription?.subscription?.plan,
    onPlanSelect,
    onClose,
  };
};

import { useState } from "react";
import { useCurrentSubscription, usePlans, useProfile } from "@/api";
import { getPeriodLabel } from "@/components/business/Checkout/constants";
import { isSubscriptionActive } from "@/components/business/Subscription/utils";
import { formatCurrency } from "@/utils/format-currency";
import { getPendingPayment } from "@/utils/pending-payment";
import { formatChargeDate, getSuccessKind, maskEmail } from "../utils";
import { useSubscriptionActivated } from "./useSubscriptionActivated";
import { useWaitingStage } from "./useWaitingStage";

export const usePaymentSuccess = () => {
  const [payment] = useState(getPendingPayment);

  const { data: profile } = useProfile();
  const isGuest = profile?.status === "guest";

  const { data: subscription } = useCurrentSubscription({
    enabled: Boolean(profile) && !isGuest,
    refetchOnMount: "always",
    refetchInterval: (query) =>
      isSubscriptionActive(query.state.data, payment?.planId)
        ? false
        : 1000 * 3,
  });
  const { plans } = usePlans();

  const isActive = isSubscriptionActive(subscription, payment?.planId);
  const plan = plans.find((item) => item.id === subscription?.plan);

  const waitingStage = useWaitingStage(!isActive);
  useSubscriptionActivated(isActive);

  return {
    isGuest,
    isReady: isActive && Boolean(plan),
    waitingStage,
    kind: getSuccessKind(payment),
    planName: plan?.name,
    todayAmount: payment && formatCurrency(payment.amount),
    nextAmount: payment && formatCurrency(payment.nextAmount),
    periodLabel: payment && getPeriodLabel(payment.isSixMonths),
    nextChargeDate:
      subscription?.current_period_end &&
      formatChargeDate(subscription.current_period_end),
    receiptEmail: payment && profile?.email && maskEmail(profile.email),
  };
};

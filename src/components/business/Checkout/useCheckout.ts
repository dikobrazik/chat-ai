import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify/unstyled";
import {
  getTPayLink,
  useCurrentSubscription,
  usePlans,
  useProfile,
} from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "@/components/business/Subscription/constants";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import {
  DEFAULT_PAYMENT_METHOD,
  PAYMENT_METHODS_MAP,
  type PaymentMethodId,
} from "./constants";
import { useGuestRedirect } from "./useGuestRedirect";

export const useCheckout = () => {
  const { plan: planId } = useParams<{ plan: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSixMonths = searchParams.get(SIX_MONTHS_QUERY_KEY) === "true";

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(
    DEFAULT_PAYMENT_METHOD,
  );
  const [isPaying, setIsPaying] = useState(false);

  const { plans, sixMonthsPlans, isLoading, isError } = usePlans();
  const { data: activeSubscription } = useCurrentSubscription();
  const { data: profile } = useProfile();

  const plan = (isSixMonths ? sixMonthsPlans : plans).find(
    (item) => item.id === planId,
  );

  const isGuest = profile?.status === "guest";

  useGuestRedirect(isGuest, planId, isSixMonths);

  const onClose = () => {
    const cameFromApp =
      window.history.length > 2 ||
      document.referrer.startsWith(window.location.origin);

    if (cameFromApp) {
      router.back();
      return;
    }

    router.push("/plans");
  };

  const onPay = async () => {
    setIsPaying(true);

    try {
      if (selectedMethod === PAYMENT_METHODS_MAP.tpay) {
        const { RedirectUrl } = await getTPayLink({
          tariff: planId,
          sixMonths: isSixMonths,
        });

        window.location.href = RedirectUrl;
        return;
      }
    } catch {
      toast.error(
        "Не удалось начать оплату. Попробуйте ещё раз или напишите в поддержку",
      );
    }

    setIsPaying(false);
  };

  return {
    plan,
    isSixMonths,
    isLoading,
    isError,
    isFreePlan: plan?.price === 0,
    isGuest,
    isPlanActive:
      activeSubscription?.plan === planId &&
      activeSubscription?.status === "active",
    isPaying,
    isPayDisabled: selectedMethod === PAYMENT_METHODS_MAP.sbp,
    pricing: plan && getPlanPricing(plan, isSixMonths, selectedMethod),
    selectedMethod,
    onMethodSelect: setSelectedMethod,
    onClose,
    onPay,
  };
};

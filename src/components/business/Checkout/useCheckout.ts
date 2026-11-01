import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify/unstyled";
import {
  getTbankLink,
  getTPayLink,
  useCurrentSubscription,
  usePlans,
  useProfile,
} from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "@/components/business/Subscription/constants";
import { getPlanPricing } from "@/components/business/Subscription/pricing";
import { isSubscriptionActive } from "@/components/business/Subscription/utils";
import { useToggle } from "@/hooks/useToggle";
import { getMobileOs } from "@/utils/mobile-os";
import { savePendingPayment } from "@/utils/pending-payment";
import {
  DEFAULT_PAYMENT_METHOD,
  PAYMENT_METHODS_MAP,
  type PaymentMethodId,
} from "./constants";
import { useGuestRedirect } from "./useGuestRedirect";
import { useRestoreSbpPayment } from "./useRestoreSbpPayment";
import { useSbpPaymentRedirect } from "./useSbpPaymentRedirect";
import { createPendingPayment } from "./utils";

export const useCheckout = () => {
  const { plan: planId } = useParams<{ plan: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSixMonths = searchParams.get(SIX_MONTHS_QUERY_KEY) === "true";

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(
    DEFAULT_PAYMENT_METHOD,
  );
  const [isPaying, setIsPaying] = useState(false);
  const {
    active: isSbpQrOpen,
    toggleOn: openSbpQr,
    toggleOff: closeSbpQr,
  } = useToggle();
  const {
    active: isSbpBanksOpen,
    toggleOn: openSbpBanks,
    toggleOff: closeSbpBanks,
  } = useToggle();
  const { active: isSbpPaymentStarted, toggleOn: startSbpPayment } =
    useToggle();

  const { plans, sixMonthsPlans, isLoading, isError } = usePlans();
  const { data: activeSubscription } = useCurrentSubscription({
    refetchInterval: (query) =>
      isSbpPaymentStarted && !isSubscriptionActive(query.state.data, planId)
        ? 1000 * 3
        : false,
  });
  const { data: profile } = useProfile();

  const plan = (isSixMonths ? sixMonthsPlans : plans).find(
    (item) => item.id === planId,
  );

  const isGuest = profile?.status === "guest";
  const isPlanActive = isSubscriptionActive(activeSubscription, planId);

  useGuestRedirect(isGuest, planId, isSixMonths);
  useRestoreSbpPayment(planId, isSixMonths, startSbpPayment);
  useSbpPaymentRedirect(isSbpPaymentStarted && isPlanActive);

  const rememberPayment = (paymentMethod: PaymentMethodId) => {
    if (plan) {
      savePendingPayment(
        createPendingPayment(plan, isSixMonths, paymentMethod),
      );
    }
  };

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
    if (selectedMethod === PAYMENT_METHODS_MAP.sbp) {
      rememberPayment(selectedMethod);
      startSbpPayment();

      if (getMobileOs()) {
        openSbpBanks();
      } else {
        openSbpQr();
      }

      return;
    }

    setIsPaying(true);

    try {
      if (selectedMethod === PAYMENT_METHODS_MAP.tpay) {
        const { RedirectUrl } = await getTPayLink({
          tariff: planId,
          sixMonths: isSixMonths,
        });

        rememberPayment(selectedMethod);
        window.location.href = RedirectUrl;
        return;
      } else if (selectedMethod === PAYMENT_METHODS_MAP.tbank) {
        const { PaymentURL } = await getTbankLink({
          tariff: planId,
          sixMonths: isSixMonths,
        });

        rememberPayment(selectedMethod);
        window.location.href = PaymentURL;
      }
    } catch (e) {
      console.log(e);

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
    isPlanActive,
    isPaying,
    isSbpQrOpen,
    isSbpBanksOpen,
    pricing: plan && getPlanPricing(plan, isSixMonths, selectedMethod),
    selectedMethod,
    onMethodSelect: setSelectedMethod,
    onSbpQrClose: closeSbpQr,
    onSbpBanksClose: closeSbpBanks,
    onClose,
    onPay,
  };
};

import { useState } from "react";
import {
  getCheckoutPath,
  PLANS_PATH,
} from "@/components/business/Subscription/constants";
import { getPendingPayment } from "@/utils/pending-payment";

export const usePaymentRetry = () => {
  const [payment] = useState(getPendingPayment);

  return {
    isRetryAvailable: Boolean(payment),
    retryPath: payment
      ? getCheckoutPath(payment.planId, payment.isSixMonths)
      : PLANS_PATH,
  };
};

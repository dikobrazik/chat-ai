import { useEffect } from "react";
import { getPendingPayment } from "@/utils/pending-payment";
import { PAYMENT_METHODS_MAP } from "./constants";

export const useRestoreSbpPayment = (
  planId: string,
  isSixMonths: boolean,
  onRestore: () => void,
) => {
  useEffect(() => {
    const payment = getPendingPayment();

    if (
      payment?.paymentMethod === PAYMENT_METHODS_MAP.sbp &&
      payment.planId === planId &&
      payment.isSixMonths === isSixMonths
    ) {
      onRestore();
    }
  }, [planId, isSixMonths, onRestore]);
};

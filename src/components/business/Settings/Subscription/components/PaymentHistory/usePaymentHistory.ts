import { useState } from "react";
import { usePayments, useProfile } from "@/api";
import { PAYMENTS_PAGE_SIZE } from "./constants";

export const usePaymentHistory = () => {
  const { data: payments = [], isLoading } = usePayments();
  const { data: profile } = useProfile();
  const [visibleCount, setVisibleCount] = useState(PAYMENTS_PAGE_SIZE);

  return {
    payments: payments.slice(0, visibleCount),
    email: profile?.email,
    hasMore: payments.length > visibleCount,
    isLoading,
    onShowMore: () => setVisibleCount((count) => count + PAYMENTS_PAGE_SIZE),
  };
};

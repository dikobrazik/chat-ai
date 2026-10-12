import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { PLANS_QUERY_KEY, PROFILE_QUERY_KEY } from "@/api";
import { clearPendingPayment } from "@/utils/pending-payment";

export const useSubscriptionActivated = (isActive: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    clearPendingPayment();
    queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
  }, [isActive, queryClient]);
};

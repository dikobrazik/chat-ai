import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { PLANS_QUERY_KEY, PROFILE_QUERY_KEY } from "@/api";

export const useSubscriptionActivated = (isActive: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
  }, [isActive, queryClient]);
};

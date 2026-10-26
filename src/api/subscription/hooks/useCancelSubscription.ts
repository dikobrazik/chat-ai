import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelSubscription, type Subscription } from "../api";
import { CURRENT_SUBSCRIPTION_QUERY_KEY } from "./useCurrentSubscription";

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      queryClient.setQueryData<Subscription>(
        CURRENT_SUBSCRIPTION_QUERY_KEY,
        (subscription) =>
          subscription && { ...subscription, status: "canceled" },
      );
      queryClient.invalidateQueries({
        queryKey: CURRENT_SUBSCRIPTION_QUERY_KEY,
      });
    },
  });
};

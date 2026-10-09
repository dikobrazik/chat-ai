import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CURRENT_SUBSCRIPTION_QUERY_KEY } from "../../subscription/hooks/useCurrentSubscription";
import { removePaymentMethod } from "../api";
import { PAYMENT_METHOD_QUERY_KEY } from "./usePaymentMethod";

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePaymentMethod,
    onSuccess: () => {
      queryClient.setQueryData(PAYMENT_METHOD_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CURRENT_SUBSCRIPTION_QUERY_KEY,
      });
    },
  });
};

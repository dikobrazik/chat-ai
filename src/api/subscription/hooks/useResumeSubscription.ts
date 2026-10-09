import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeSubscription, type Subscription } from "../api";
import { CURRENT_SUBSCRIPTION_QUERY_KEY } from "./useCurrentSubscription";

export const useResumeSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeSubscription,
    onSuccess: () => {
      queryClient.setQueryData<Subscription>(
        CURRENT_SUBSCRIPTION_QUERY_KEY,
        (subscription) => subscription && { ...subscription, status: "active" },
      );
      queryClient.invalidateQueries({
        queryKey: CURRENT_SUBSCRIPTION_QUERY_KEY,
      });
    },
  });
};

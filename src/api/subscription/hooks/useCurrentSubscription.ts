import { useQuery } from "@tanstack/react-query";
import { getSubscription } from "../api";

export const CURRENT_SUBSCRIPTION_QUERY_KEY = ["current-subscription"];

export const useCurrentSubscription = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: CURRENT_SUBSCRIPTION_QUERY_KEY,
    queryFn: () => getSubscription(),
  });

  return { data, isLoading, isError };
};

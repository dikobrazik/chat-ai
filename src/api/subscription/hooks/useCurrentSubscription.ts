import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { getSubscription, type Subscription } from "../api";

export const CURRENT_SUBSCRIPTION_QUERY_KEY = ["current-subscription"];

export const useCurrentSubscription = (
  options?: Omit<
    UndefinedInitialDataOptions<Subscription, Error, Subscription, string[]>,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, isLoading, isError } = useQuery({
    ...options,
    queryKey: CURRENT_SUBSCRIPTION_QUERY_KEY,
    queryFn: () => getSubscription(),
  });

  return { data, isLoading, isError };
};

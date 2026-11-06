import { useQuery } from "@tanstack/react-query";
import { getProviderBalances } from "..";

export const PROVIDER_BALANCES_QUERY_KEY = ["admin", "balances"];

export const useProviderBalances = () =>
  useQuery({
    queryKey: PROVIDER_BALANCES_QUERY_KEY,
    queryFn: getProviderBalances,
    refetchInterval: false,
    retry: false,
  });

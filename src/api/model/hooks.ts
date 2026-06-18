import { useQuery } from "@tanstack/react-query";
import { getProviders } from "./api";

export const PROVIDERS_QUERY_KEY = ["providers"];

export const useProviders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: PROVIDERS_QUERY_KEY,
    queryFn: getProviders,
    refetchInterval: false,
  });

  return { data, isLoading, isError };
};

import { useQuery } from "@tanstack/react-query";
import { getProviders } from "./api";

export const PROVIDERS_QUERY_KEY = ["providers"];

export const useProviders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: PROVIDERS_QUERY_KEY,
    queryFn: getProviders,
    gcTime: 1000 * 60 * 60 * 6, // 6 hours
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });

  return { data, isLoading, isError };
};

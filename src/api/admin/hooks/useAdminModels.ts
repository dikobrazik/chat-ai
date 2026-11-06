import { useQuery } from "@tanstack/react-query";
import { getAdminModels } from "..";

export const ADMIN_MODELS_QUERY_KEY = ["admin", "models"];

export const useAdminModels = () =>
  useQuery({
    queryKey: ADMIN_MODELS_QUERY_KEY,
    queryFn: getAdminModels,
    refetchInterval: false,
    retry: false,
  });

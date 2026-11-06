import { useQuery } from "@tanstack/react-query";
import { getAdminSession } from "..";

export const ADMIN_SESSION_QUERY_KEY = ["admin", "session"];

export const useAdminSession = () =>
  useQuery({
    queryKey: ADMIN_SESSION_QUERY_KEY,
    queryFn: getAdminSession,
    refetchInterval: false,
    retry: false,
  });

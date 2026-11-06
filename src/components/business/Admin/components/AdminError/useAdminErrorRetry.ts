import { useQueryClient } from "@tanstack/react-query";
import { ADMIN_SESSION_QUERY_KEY } from "@/api";
import { isAccessError } from "../../utils";

export const useAdminErrorRetry = (error: Error, onRetry: () => void) => {
  const queryClient = useQueryClient();
  const isSessionLost = isAccessError(error);

  const retry = () =>
    isSessionLost
      ? queryClient.invalidateQueries({ queryKey: ADMIN_SESSION_QUERY_KEY })
      : onRetry();

  return { isSessionLost, retry };
};

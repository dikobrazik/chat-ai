import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { type AdminSession, confirmAdminCode } from "..";
import { ADMIN_SESSION_QUERY_KEY } from "./useAdminSession";

export const useConfirmAdminCode = (
  options?: MutationOptions<AdminSession, Error, string>,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: confirmAdminCode,
    onSuccess: (session, ...rest) => {
      queryClient.setQueryData(ADMIN_SESSION_QUERY_KEY, session);
      options?.onSuccess?.(session, ...rest);
    },
  });

  return {
    confirmCode: mutation.mutate,
    isCodeConfirming: mutation.isPending,
  };
};

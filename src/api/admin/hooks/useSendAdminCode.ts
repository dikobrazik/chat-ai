import { useMutation } from "@tanstack/react-query";
import { sendAdminCode } from "..";

export const useSendAdminCode = () => {
  const mutation = useMutation({ mutationFn: sendAdminCode });

  return {
    sendCode: () => mutation.mutate(),
    isCodeSent: mutation.isSuccess,
    isCodeSending: mutation.isPending,
  };
};

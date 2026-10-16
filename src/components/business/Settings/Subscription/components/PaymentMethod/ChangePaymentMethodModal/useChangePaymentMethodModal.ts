import { useQueryClient } from "@tanstack/react-query";
import { PAYMENT_METHOD_QUERY_KEY } from "@/api";

export const useChangePaymentMethodModal = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: PAYMENT_METHOD_QUERY_KEY });
    onClose();
  };
};

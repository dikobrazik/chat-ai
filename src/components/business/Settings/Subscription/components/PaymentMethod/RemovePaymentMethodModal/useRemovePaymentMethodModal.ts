import { toast } from "react-toastify/unstyled";
import { useRemovePaymentMethod } from "@/api";
import { useSubscriptionState } from "../../../hooks/useSubscriptionState";

export const useRemovePaymentMethodModal = (onClose: () => void) => {
  const { periodEnd } = useSubscriptionState();
  const { mutateAsync: removePaymentMethod, isPending } =
    useRemovePaymentMethod();

  const onRemove = async () => {
    try {
      await removePaymentMethod();
      toast.success(`Способ оплаты отвязан. Доступ сохранится до ${periodEnd}`);
      onClose();
    } catch {
      toast.error(
        "Не удалось отвязать способ оплаты. Попробуйте ещё раз или напишите в поддержку",
      );
    }
  };

  return { periodEnd, isRemoving: isPending, onRemove };
};

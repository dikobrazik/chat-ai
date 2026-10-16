import { toast } from "react-toastify/unstyled";
import { useCancelSubscription } from "@/api";
import { useSubscriptionState } from "../../../hooks/useSubscriptionState";

export const useCancelSubscriptionModal = (onClose: () => void) => {
  const { planName, periodEnd } = useSubscriptionState();
  const { mutateAsync: cancelSubscription, isPending } =
    useCancelSubscription();

  const onCancel = async () => {
    try {
      await cancelSubscription();
      toast.success(`Подписка отменена. Доступ сохранится до ${periodEnd}`);
      onClose();
    } catch {
      toast.error(
        "Не удалось отменить подписку. Попробуйте ещё раз или напишите в поддержку",
      );
    }
  };

  return { planName, periodEnd, isCanceling: isPending, onCancel };
};

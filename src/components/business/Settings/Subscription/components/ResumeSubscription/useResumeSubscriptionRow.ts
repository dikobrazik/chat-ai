import { toast } from "react-toastify/unstyled";
import { usePaymentMethod, useResumeSubscription } from "@/api";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";

export const useResumeSubscriptionRow = () => {
  const { periodEnd, isCanceled } = useSubscriptionState();
  const { data: paymentMethod } = usePaymentMethod();
  const { mutateAsync: resumeSubscription, isPending } =
    useResumeSubscription();

  const onResume = async () => {
    try {
      await resumeSubscription();
      toast.success(`Подписка возобновлена. Следующее списание — ${periodEnd}`);
    } catch {
      toast.error(
        "Не удалось возобновить подписку. Попробуйте ещё раз или напишите в поддержку",
      );
    }
  };

  return {
    periodEnd,
    canResume: isCanceled && Boolean(paymentMethod),
    isResuming: isPending,
    onResume,
  };
};

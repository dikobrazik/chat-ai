import { toast } from "react-toastify/unstyled";
import { usePaymentMethod, useRemovePaymentMethod } from "@/api";
import { useDialogModal } from "@/components/business/DialogModal/useDialogModal";
import { useToggle } from "@/hooks/useToggle";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";

export const usePaymentMethodSection = () => {
  const { periodEnd, isActive } = useSubscriptionState();
  const { data: paymentMethod } = usePaymentMethod();
  const { mutateAsync: removePaymentMethod } = useRemovePaymentMethod();
  const { showDialogModal, hideDialogModal } = useDialogModal();
  const { active: isChangeOpen, toggle: toggleChange } = useToggle();

  const onRemoveConfirm = async () => {
    try {
      await removePaymentMethod();
      toast.success(`Способ оплаты отвязан. Доступ сохранится до ${periodEnd}`);
    } catch {
      toast.error(
        "Не удалось отвязать способ оплаты. Попробуйте ещё раз или напишите в поддержку",
      );
    }

    hideDialogModal();
  };

  const onRemove = () =>
    showDialogModal({
      title: "Отвязать способ оплаты?",
      description: `Автопродление отключится, списаний больше не будет. Доступ сохранится до ${periodEnd}`,
      actions: [
        {
          size: "m",
          variant: "base",
          children: "Отмена",
          onClick: hideDialogModal,
        },
        {
          size: "m",
          variant: "danger",
          children: "Отвязать",
          onClick: onRemoveConfirm,
        },
      ],
    });

  return {
    paymentMethod: isActive ? paymentMethod : null,
    isChangeOpen,
    toggleChange,
    onRemove,
  };
};

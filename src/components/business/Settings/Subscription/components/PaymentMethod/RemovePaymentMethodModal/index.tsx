import { ConfirmModal } from "../../ConfirmModal";
import { useRemovePaymentMethodModal } from "./useRemovePaymentMethodModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const RemovePaymentMethodModal = ({ isOpen, onClose }: Props) => {
  const { periodEnd, isRemoving, onRemove } =
    useRemovePaymentMethodModal(onClose);

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Отвязать способ оплаты?"
      description={`Автопродление отключится, списаний больше не будет. Доступ сохранится до ${periodEnd}`}
      cancelText="Отмена"
      confirmText="Отвязать"
      isConfirming={isRemoving}
      onConfirm={onRemove}
      onClose={onClose}
    />
  );
};

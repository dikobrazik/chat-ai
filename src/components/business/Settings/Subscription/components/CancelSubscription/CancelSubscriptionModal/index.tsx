import Icon from "@/components/ui/Icon";
import { ConfirmModal } from "../../ConfirmModal";
import { useCancelSubscriptionModal } from "./useCancelSubscriptionModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CancelSubscriptionModal = ({ isOpen, onClose }: Props) => {
  const { planName, periodEnd, isCanceling, onCancel } =
    useCancelSubscriptionModal(onClose);

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Отмена подписки"
      description={`Ваша подписка ${planName} будет отменена, списаний больше не будет. Она останется активной до конца расчётного периода — ${periodEnd}`}
      cancelText="Вернуться"
      confirmText="Отменить подписку"
      confirmIcon={<Icon name="close-square" />}
      isConfirming={isCanceling}
      onConfirm={onCancel}
      onClose={onClose}
    />
  );
};

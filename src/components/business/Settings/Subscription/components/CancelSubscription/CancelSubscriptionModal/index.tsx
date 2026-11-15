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
      title={`Отменить ${planName}?`}
      description={`Подписка действует до ${periodEnd}, после этого модели ${planName} станут недоступны, а создавать можно будет одно изображение в день. История чатов сохранится`}
      cancelText="Оставить подписку"
      cancelVariant="primary"
      confirmText="Отменить подписку"
      confirmIcon={<Icon name="close-square" />}
      isConfirming={isCanceling}
      onConfirm={onCancel}
      onClose={onClose}
    />
  );
};

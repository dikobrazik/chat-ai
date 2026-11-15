import Icon from "@/components/ui/Icon";
import { ConfirmModal } from "../../ConfirmModal";
import { useCancelSubscriptionModal } from "./useCancelSubscriptionModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CancelSubscriptionModal = ({ isOpen, onClose }: Props) => {
  const { periodEnd, isCanceling, onCancel } =
    useCancelSubscriptionModal(onClose);

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Отменить подписку?"
      description={`Подписка действует до ${periodEnd}, после этого останутся только модели бесплатного тарифа и одно изображение в день. История чатов сохранится`}
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

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import styles from "./CancelSubscriptionModal.module.scss";
import { useCancelSubscriptionModal } from "./useCancelSubscriptionModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CancelSubscriptionModal = ({ isOpen, onClose }: Props) => {
  const { planName, periodEnd, isCanceling, onCancel } =
    useCancelSubscriptionModal(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Text type="xl">Отмена подписки</Text>
        <div className="text-center">
          <Text type="s" color="#6F6F6F" style="regular">
            Ваша подписка {planName} будет отменена, но останется активной до
            конца расчётного периода — {periodEnd}
          </Text>
        </div>
        <div className="text-center mt-2">
          <Text type="xs" color="#6F6F6F" style="regular">
            Списаний больше не будет. Вернуть деньги за оставшиеся дни можно
            через поддержку — support@jonu.ru
          </Text>
        </div>

        <div className={cn(styles.buttons, "mt-4")}>
          <Button size="m" variant="base" onClick={onClose}>
            Вернуться
          </Button>
          <Button
            size="m"
            variant="danger"
            leftIcon={<Icon name="close-square" />}
            loading={isCanceling}
            onClick={onCancel}
          >
            Отменить подписку
          </Button>
        </div>
      </div>
    </Modal>
  );
};

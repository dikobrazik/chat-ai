import { useCurrentSubscription } from "@/api";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CancelSubscriptionModal = ({ isOpen, onClose }: Props) => {
  const { data } = useCurrentSubscription();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Text type="xl">Отмена подписки</Text>
        <div className="text-center">
          <Text type="s" color="#6F6F6F" style="regular">
            Ваша подписка Plus будет отменена, но останется активной до конца
            расчётного периода —{" "}
            {new Date(
              data?.subscription?.current_period_end ?? 0,
            ).toLocaleDateString() ?? ""}
          </Text>
        </div>

        <div className="flex flex-row gap-2 mt-4">
          <Button size="m" variant="base" onClick={onClose}>
            Вернуться
          </Button>
          <Button size="m" variant="danger" onClick={onClose}>
            Отменить подписку
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { PaymentMethodQrCode } from "./PaymentMethodQrCode";
import { useChangePaymentMethodModal } from "./useChangePaymentMethodModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangePaymentMethodModal = ({ isOpen, onClose }: Props) => {
  const onModalClose = useChangePaymentMethodModal(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} title="Новый способ оплаты">
      <div className="flex flex-col gap-4">
        <Text type="s" color="#6F6F6F" style="regular">
          Отсканируйте QR-код камерой телефона или в приложении банка — привяжем
          счёт через СБП без списания. Следующие продления пройдут с него, а
          прежний способ мы отвяжем.
        </Text>

        <PaymentMethodQrCode />
      </div>
    </Modal>
  );
};

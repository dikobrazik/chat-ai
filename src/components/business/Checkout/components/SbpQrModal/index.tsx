import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { SUPPORT_EMAIL_URL } from "../../constants";
import { SbpQrCode } from "../SbpBanks";

type Props = {
  isOpen: boolean;
  tariff: string;
  sixMonths: boolean;
  onClose: () => void;
};

export const SbpQrModal = ({ isOpen, tariff, sixMonths, onClose }: Props) => (
  <Modal
    size="compact"
    title="Оплата через СБП"
    headerBorder={false}
    isOpen={isOpen}
    onClose={onClose}
  >
    <div className="flex flex-col gap-4">
      <Text style="regular" type="s" color="#6F6F6F">
        Отсканируйте QR-код камерой телефона или в приложении банка
      </Text>

      <SbpQrCode tariff={tariff} sixMonths={sixMonths} />

      <Text style="regular" type="s" color="#6F6F6F">
        Не получается оплатить?{" "}
        <Link href={SUPPORT_EMAIL_URL}>Напишите нам</Link>
      </Text>
    </div>
  </Modal>
);

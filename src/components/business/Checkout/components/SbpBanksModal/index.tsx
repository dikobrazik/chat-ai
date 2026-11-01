import Modal from "@/components/ui/Modal";
import { SbpBanks } from "../SbpBanks";

type Props = {
  isOpen: boolean;
  tariff: string;
  sixMonths: boolean;
  onClose: () => void;
};

export const SbpBanksModal = ({
  isOpen,
  tariff,
  sixMonths,
  onClose,
}: Props) => (
  <Modal
    size="small"
    title="Оплата через СБП"
    centeredTitle
    headerBorder={false}
    isOpen={isOpen}
    onClose={onClose}
  >
    <SbpBanks tariff={tariff} sixMonths={sixMonths} />
  </Modal>
);

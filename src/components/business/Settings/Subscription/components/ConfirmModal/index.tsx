import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import styles from "./ConfirmModal.module.scss";

type Props = {
  isOpen: boolean;
  title: string;
  description: ReactNode;
  cancelText: string;
  confirmText: string;
  confirmIcon?: ReactNode;
  isConfirming: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  cancelText,
  confirmText,
  confirmIcon,
  isConfirming,
  onConfirm,
  onClose,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <div className="flex flex-col">
      <Text type="s" color="#6F6F6F" style="regular">
        {description}
      </Text>

      <div className={cn(styles.buttons, "mt-4")}>
        <Button size="m" variant="base" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          size="m"
          variant="danger"
          leftIcon={confirmIcon}
          loading={isConfirming}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  </Modal>
);

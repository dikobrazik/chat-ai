"use client";

import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { stopPropagation } from "@/utils";
import { Text } from "../Text";
import styles from "./BottomSheet.module.scss";
import { useBottomSheet } from "./useBottomSheet";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export const BottomSheet = ({
  title,
  isOpen,
  onClose,
  children,
}: PropsWithChildren<Props>) => {
  const sheetRef = useBottomSheet(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={sheetRef}
        tabIndex={-1}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={stopPropagation()}
      >
        <div className={styles.handle} />
        <Text type="l" className={styles.title}>
          {title}
        </Text>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

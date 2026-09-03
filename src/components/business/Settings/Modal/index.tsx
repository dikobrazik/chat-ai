"use client";

import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import Modal from "@/components/ui/Modal";
import { SETTINGS_TITLE } from "../constants";
import { SettingsSidebar } from "../Sidebar";
import styles from "./Modal.module.scss";

export const SettingsModal = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal
      size="large"
      isOpen
      onClose={() => router.back()}
      className={styles.modal}
      title={SETTINGS_TITLE[pathname as keyof SETTINGS_TITLE]}
    >
      <Modal.Sidebar className="flex flex-col gap-6">
        <SettingsSidebar />
      </Modal.Sidebar>
      {children}
    </Modal>
  );
};

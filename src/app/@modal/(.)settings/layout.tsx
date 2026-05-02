"use client";

import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { SETTINGS_TITLE } from "@/components/business/Settings/constants";
import { SettingsSidebar } from "@/components/business/Settings/Sidebar";
import Modal from "@/components/ui/Modal";

export default function SettingsLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal
      size="large"
      isOpen
      onClose={() => router.back()}
      title={SETTINGS_TITLE[pathname as keyof SETTINGS_TITLE]}
    >
      <Modal.Sidebar className="flex flex-col gap-6">
        <SettingsSidebar />
      </Modal.Sidebar>
      {children}
    </Modal>
  );
}

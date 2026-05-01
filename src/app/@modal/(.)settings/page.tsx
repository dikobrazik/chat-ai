"use client";

import { useRouter } from "next/navigation";
import { ProfileSettings } from "@/components/business/Profile";
import Modal from "@/components/ui/Modal";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <Modal
      // size="fullscreen"
      isOpen
      onClose={() => router.back()}
      title="Аккаунт"
    >
      <ProfileSettings />
    </Modal>
  );
}

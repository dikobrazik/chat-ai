"use client";

import { useRouter } from "next/navigation";
import { ProfileSettings } from "@/components/business/Profile";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";

export default function ProfileSettingsPage() {
  const router = useRouter();

  return (
    <Modal
      // size="fullscreen"
      isOpen
      onClose={() => router.back()}
      title="Аккаунт"
    >
      <Modal.Sidebar>
        <div className="flex flex-row items-center gap-3">
          <Logo />

          <Text type="s" as="h1">
            Jonu AI
          </Text>
        </div>
      </Modal.Sidebar>
      <ProfileSettings />
    </Modal>
  );
}

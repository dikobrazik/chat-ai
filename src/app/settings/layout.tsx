"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Modal isOpen onClose={() => router.back()}>
      {children}
    </Modal>
  );
}

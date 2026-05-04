"use client";

import { useRouter } from "next/navigation";
import { AuthorizationModal } from "@/components/business/Authorization/Modal";
import Modal from "@/components/ui/Modal";

export default function LoginModal() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} isOpen headerBorder={false}>
      <AuthorizationModal />
    </Modal>
  );
}

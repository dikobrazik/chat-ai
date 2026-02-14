"use client";

import { AuthorizationModal } from "@/components/business/Authorization/Modal";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} isOpen>
      <AuthorizationModal />
    </Modal>
  );
}

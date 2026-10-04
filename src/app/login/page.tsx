"use client";

import { useRouter } from "next/navigation";
import { Login } from "@/components/business/Authorization/Login";
import Modal from "@/components/ui/Modal";

export default function LoginPage() {
  const router = useRouter();

  return (
    <Modal
      onClose={() => router.back()}
      isOpen
      headerBorder={false}
      size="compact"
    >
      <Login />
    </Modal>
  );
}

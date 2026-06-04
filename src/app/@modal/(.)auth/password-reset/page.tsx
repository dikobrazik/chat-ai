"use client";

import { useRouter } from "next/navigation";
import { PasswordReset } from "@/components/business/Authorization/PasswordReset";
import Modal from "@/components/ui/Modal";

export default function VerifyCodePage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} isOpen headerBorder={false}>
      <PasswordReset />
    </Modal>
  );
}

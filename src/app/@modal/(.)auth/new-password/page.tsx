"use client";

import { useRouter } from "next/navigation";
import { NewPassword } from "@/components/business/Authorization/NewPassword";
import Modal from "@/components/ui/Modal";

export default function VerifyCodePage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} isOpen headerBorder={false}>
      <NewPassword />
    </Modal>
  );
}

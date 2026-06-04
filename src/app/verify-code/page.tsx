"use client";

import { useRouter } from "next/navigation";
import { VerifyCode } from "@/components/business/Authorization/Verify";
import Modal from "@/components/ui/Modal";

export default function VerifyCodePage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} isOpen headerBorder={false}>
      <VerifyCode />
    </Modal>
  );
}

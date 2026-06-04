"use client";

import { useRouter } from "next/navigation";
import { Registration } from "@/components/business/Authorization/Registration";
import Modal from "@/components/ui/Modal";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} isOpen headerBorder={false}>
      <Registration />
    </Modal>
  );
}

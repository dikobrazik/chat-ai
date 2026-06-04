"use client";

import { useRouter } from "next/navigation";
import { PaymentStatus } from "@/components/business/PaymentStatus";
import Modal from "@/components/ui/Modal";

export default function PaymentFailure() {
  const router = useRouter();

  return (
    <Modal headerBorder={false} isOpen onClose={() => router.push("/")}>
      <PaymentStatus status="failure" />
    </Modal>
  );
}

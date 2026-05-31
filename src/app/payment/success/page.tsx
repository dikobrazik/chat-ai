"use client";

import { useRouter } from "next/navigation";
import { PaymentStatus } from "@/components/business/PaymentStatus";
import Modal from "@/components/ui/Modal";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <Modal headerBorder={false} isOpen onClose={() => router.push("/")}>
      <PaymentStatus status="success" />
    </Modal>
  );
}

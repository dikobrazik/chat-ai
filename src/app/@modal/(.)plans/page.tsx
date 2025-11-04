"use client";

import { Plans } from "@/components/business/Subscription/Plans";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

export default function PlansPage() {
  const router = useRouter();

  return (
    <Modal
      size="fullscreen"
      isOpen
      onClose={() => router.back()}
      title="Тарифы"
    >
      <Plans />
    </Modal>
  );
}

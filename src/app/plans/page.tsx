"use client";

import { useRouter } from "next/navigation";
import { Plans } from "@/components/business/Subscription/Plans";
import Modal from "@/components/ui/Modal";

export default function PlansPage() {
  const router = useRouter();

  return (
    <Modal
      size="fullscreen"
      isOpen
      className="bg-[#F7F7F7]"
      onClose={() => router.back()}
    >
      <Plans />
    </Modal>
  );
}

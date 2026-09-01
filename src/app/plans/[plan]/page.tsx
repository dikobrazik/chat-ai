"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getTPayLink } from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "@/components/business/Subscription/constants";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function PlanPage() {
  const { plan } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onTPayClick = async () => {
    const { RedirectUrl } = await getTPayLink({
      plan: plan as string,
      sixMonths: searchParams.get(SIX_MONTHS_QUERY_KEY) === "true",
    });

    router.push(RedirectUrl);
  };

  return (
    <div>
      <Modal isOpen onClose={() => router.back()}>
        <div className="h-[380px]">
          <Button variant="primary" onClick={onTPayClick}>
            Оплатить через TPay
          </Button>
        </div>
      </Modal>
    </div>
  );
}

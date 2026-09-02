"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getTPayLink, linkBank, useSbpBanksList } from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "@/components/business/Subscription/constants";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function PlanPage() {
  const { plan } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: banksList } = useSbpBanksList();

  const onTPayClick = async () => {
    const { RedirectUrl } = await getTPayLink({
      plan: plan as string,
      sixMonths: searchParams.get(SIX_MONTHS_QUERY_KEY) === "true",
    });

    router.push(RedirectUrl);
  };

  const onBankClick = (bankId: string) => {
    linkBank({ bankId });
  };

  return (
    <div>
      <Modal isOpen onClose={() => router.back()}>
        <div>
          <Button variant="primary" onClick={onTPayClick}>
            Оплатить через TPay
          </Button>
        </div>
        <div className="mt-2">Оплата по СБП через:</div>
        <div className="flex flex-col gap-2 mt-2">
          {banksList?.map((bank) => (
            <Button key={bank.BankId} onClick={() => onBankClick(bank.BankId)}>
              <Image
                width={50}
                height={50}
                src={bank.BankLogo}
                alt="bank logo"
              />
              {bank.BankName}
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

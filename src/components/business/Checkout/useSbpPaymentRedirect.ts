import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSbpPaymentRedirect = (isPaid: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (isPaid) {
      router.replace("/payment/success");
    }
  }, [isPaid, router]);
};

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  getCheckoutPath,
  getPlanPath,
} from "@/components/business/Subscription/constants";
import { saveAuthRedirect } from "@/utils/auth-redirect";

export const useGuestRedirect = (
  isGuest: boolean,
  planId: string,
  isSixMonths: boolean,
) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!isGuest || pathname !== getPlanPath(planId)) {
      return;
    }

    saveAuthRedirect(getCheckoutPath(planId, isSixMonths));
  }, [isGuest, planId, isSixMonths, pathname]);
};

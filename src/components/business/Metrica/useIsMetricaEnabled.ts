import { usePathname } from "next/navigation";
import { useCookieConsentContext } from "@/providers/CookieConsentProvider/hooks";
import { METRICA_EXCLUDED_PATH_PREFIX } from "./constants";

export const useIsMetricaEnabled = () => {
  const pathname = usePathname();
  const { isAnalyticsAllowed } = useCookieConsentContext();

  return (
    isAnalyticsAllowed && !pathname.startsWith(METRICA_EXCLUDED_PATH_PREFIX)
  );
};

import { createContext } from "react";

export const CookieConsentContext = createContext<{
  isConsentRequired: boolean;
  isAnalyticsAllowed: boolean;
  saveConsent: (isApproved: boolean) => void;
}>({
  isConsentRequired: false,
  isAnalyticsAllowed: false,
  saveConsent: () => {},
});

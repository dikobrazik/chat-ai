"use client";

import { useEffect, useState } from "react";
import { COOKIE_APPROVED_LOCAL_STORAGE_KEY } from "@/constants/cookies";
import { CookieConsentContext } from "./context";

export const CookieConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [consent, setConsent] = useState<string | null>();

  useEffect(() => {
    setConsent(window.localStorage.getItem(COOKIE_APPROVED_LOCAL_STORAGE_KEY));
  }, []);

  const saveConsent = (isApproved: boolean) => {
    const value = isApproved ? "1" : "0";

    window.localStorage.setItem(COOKIE_APPROVED_LOCAL_STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        isConsentRequired: consent === null,
        isAnalyticsAllowed: consent === "1",
        saveConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

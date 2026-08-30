import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { MAILING_CONSENT_LOCAL_STORAGE_KEY } from "@/constants/auth";

export const EmailAuthContext = createContext({
  email: "",
  setEmail: (_email: string) => {},
  mailingConsent: false,
  setMailingConsent: (_mailingConsent: boolean) => {},
});

export const EmailAuthProvider = ({ children }: PropsWithChildren) => {
  const [email, setEmail] = useState("");
  const [mailingConsent, setMailingConsentState] = useState(false);

  // выбор переживает OAuth-редирект и перезагрузку страницы
  useEffect(() => {
    setMailingConsentState(
      localStorage.getItem(MAILING_CONSENT_LOCAL_STORAGE_KEY) === "1",
    );
  }, []);

  const setMailingConsent = (consent: boolean) => {
    setMailingConsentState(consent);
    localStorage.setItem(
      MAILING_CONSENT_LOCAL_STORAGE_KEY,
      consent ? "1" : "0",
    );
  };

  return (
    <EmailAuthContext.Provider
      value={{ email, setEmail, mailingConsent, setMailingConsent }}
    >
      {children}
    </EmailAuthContext.Provider>
  );
};

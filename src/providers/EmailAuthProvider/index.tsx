import { createContext, type PropsWithChildren, useState } from "react";

export const EmailAuthContext = createContext({
  email: "",
  setEmail: (_email: string) => {},
  mailingConsent: false,
  setMailingConsent: (_mailingConsent: boolean) => {},
});

export const EmailAuthProvider = ({ children }: PropsWithChildren) => {
  const [email, setEmail] = useState("");
  const [mailingConsent, setMailingConsent] = useState(false);

  return (
    <EmailAuthContext.Provider
      value={{ email, setEmail, mailingConsent, setMailingConsent }}
    >
      {children}
    </EmailAuthContext.Provider>
  );
};

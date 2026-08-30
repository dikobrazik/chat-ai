import { useContext } from "react";
import { EmailAuthContext } from ".";

export const useEmailAuth = () => {
  const { email, setEmail, mailingConsent, setMailingConsent } =
    useContext(EmailAuthContext);
  return { email, setEmail, mailingConsent, setMailingConsent };
};

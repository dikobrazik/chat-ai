import { useContext } from "react";
import { CookieConsentContext } from "./context";

export const useCookieConsentContext = () => {
  const context = useContext(CookieConsentContext);

  return context;
};

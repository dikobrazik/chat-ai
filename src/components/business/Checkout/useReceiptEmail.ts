import { useState } from "react";
import { RECEIPT_EMAIL_SCHEMA } from "./constants";

export const useReceiptEmail = (profileEmail?: string | null) => {
  const [receiptEmail, setReceiptEmail] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isRequired = !profileEmail;
  const isValid = RECEIPT_EMAIL_SCHEMA.isValidSync(receiptEmail);

  return {
    receiptEmail,
    receiptEmailPayload: isRequired ? receiptEmail : undefined,
    isReceiptEmailRequired: isRequired,
    isReceiptEmailReady: !isRequired || isValid,
    hasReceiptEmailError: isTouched && !isValid,
    onReceiptEmailChange: setReceiptEmail,
    onReceiptEmailBlur: () => setIsTouched(true),
  };
};

import { useContext } from "react";
import { EmailAuthContext } from ".";

export const useEmailAuth = () => {
  const { email, setEmail } = useContext(EmailAuthContext);
  return { email, setEmail };
};

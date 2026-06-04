import { createContext, type PropsWithChildren, useState } from "react";

export const EmailAuthContext = createContext({
  email: "",
  setEmail: (_email: string) => {},
});

export const EmailAuthProvider = ({ children }: PropsWithChildren) => {
  const [email, setEmail] = useState("");
  return (
    <EmailAuthContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailAuthContext.Provider>
  );
};

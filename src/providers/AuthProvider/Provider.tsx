"use client";

import type { PropsWithChildren } from "react";
import { AuthContext } from "./context";
import { useAuth } from "./hooks";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isGuest, isReady, setIsGuest, onLogoutClick } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        isReady,
        setIsGuest,
        onLogoutClick,
        isSubscribed: false,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

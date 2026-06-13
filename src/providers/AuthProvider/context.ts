import React from "react";

type AuthContextValue = {
  isGuest: boolean;
  isReady: boolean;

  isSubscribed: boolean;

  onGuestRegistered: (token: string) => void;
  setIsGuest: (isGuest: boolean) => void;
  onLogoutClick: () => void;
};

export const AuthContext = React.createContext<AuthContextValue>({
  isGuest: true,
  isReady: false,
  isSubscribed: false,
  setIsGuest: () => {},
  onGuestRegistered: () => {},
  onLogoutClick: () => {},
});

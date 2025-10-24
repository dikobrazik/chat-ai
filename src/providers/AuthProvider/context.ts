import React from "react";

type AuthContextValue = {
  isGuest: boolean;
  isReady: boolean;

  isSubscribed: boolean;

  onLogoutClick: () => void;
};

export const AuthContext = React.createContext<AuthContextValue>({
  isGuest: true,
  isReady: false,
  isSubscribed: false,
  onLogoutClick: () => {},
});

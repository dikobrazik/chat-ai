import { setAuthToken, createGuest } from "@/api";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY,
} from "@/constants/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(true);

  const { mutateAsync: mutateCreateGuest } = useMutation({
    mutationFn: createGuest,
    onSuccess: (token) => {
      setAuthToken(token);
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);
      localStorage.setItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY, "local");

      setIsGuest(true);
      setIsReady(true)
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasAccessToken = Boolean(
        localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY),
      );

      const isSourceLocal =
        localStorage.getItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY) === "local";

      if (!hasAccessToken) {
        mutateCreateGuest();
      } else {
        setAuthToken(
          localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY) as string,
        );
        setIsGuest(isSourceLocal);

        setIsReady(true);
      }
    }
  }, [mutateCreateGuest]);

  const onLogoutClick = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY);

    queryClient.invalidateQueries();

    mutateCreateGuest().then(() => router.push('/chat'));
  }, [mutateCreateGuest]);

  return { isGuest, isReady, setIsGuest, onLogoutClick };
};

export const useAuthContext = () => {
  const { isGuest, isReady, isSubscribed, setIsGuest, onLogoutClick } = useContext(AuthContext);

  return { isGuest, isReady, isSubscribed, setIsGuest, onLogoutClick };
};

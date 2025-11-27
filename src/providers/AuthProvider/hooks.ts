import {
  setAuthToken,
  createGuest,
  refreshAccessToken,
  postLogout,
} from "@/api";
import { ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY } from "@/constants/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import {
  isRefreshTokenExpiredError,
  isTokenExpiredError,
} from "@/api/auth/utils";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(true);

  const { mutateAsync: mutateCreateGuest } = useMutation({
    mutationFn: createGuest,
    onSuccess: (token) => {
      setAuthToken(token);
      localStorage.setItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY, "local");

      setIsGuest(true);
      setIsReady(true);
    },
  });

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const isSourceLocal =
          localStorage.getItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY) ===
          "local";

        await refreshAccessToken()
          .then((newToken) => {
            setAuthToken(newToken);
            setIsGuest(isSourceLocal);
            setIsReady(true);
          })
          .catch(() => {
            setIsGuest(true);
            mutateCreateGuest();
          });

        queryClient.setDefaultOptions({
          queries: {
            retry: (failureCount, error) =>
              isTokenExpiredError(error) ? true : failureCount < 3, // retry max 3 times
          },
        });

        let isRefreshing = false;
        const failedQueue: Array<{
          resolve: (token: string) => void;
          reject: (err: any) => void;
        }> = [];

        axios.interceptors.response.use(
          (response) => response,
          async (error: AxiosError) => {
            console.log(isRefreshing, error);
            if (isTokenExpiredError(error)) {
              const originalRequest = error.config;

              if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                  failedQueue.push({ resolve, reject });
                }).then((token) =>
                  axios({
                    ...originalRequest,
                    headers: {
                      ...originalRequest?.headers,
                      Authorization: `Bearer ${token}`,
                    },
                  }),
                );
              }

              isRefreshing = true;
              let newToken: string = "";

              try {
                newToken = await refreshAccessToken();

                setAuthToken(newToken);

                failedQueue.forEach((prom) => {
                  prom.resolve(newToken);
                });
              } catch (err) {
                failedQueue.forEach((prom) => {
                  prom.reject(err);
                });
              } finally {
                failedQueue.length = 0;
                isRefreshing = false;
              }

              return axios({
                ...originalRequest,
                headers: {
                  ...originalRequest?.headers,
                  Authorization: `Bearer ${newToken}`,
                },
              });
            }

            if (isRefreshTokenExpiredError(error)) {
              setIsGuest(true);
              await mutateCreateGuest();
              router.push("/chat");
            }

            return Promise.reject(error);
          },
        );
      }
    })();
  }, []);

  const onLogoutClick = useCallback(async () => {
    setAuthToken("");
    await postLogout();

    queryClient.invalidateQueries();

    mutateCreateGuest().then(() => router.push("/chat"));
  }, [mutateCreateGuest]);

  return { isGuest, isReady, setIsGuest, onLogoutClick };
};

export const useAuthContext = () => {
  const { isGuest, isReady, isSubscribed, setIsGuest, onLogoutClick } =
    useContext(AuthContext);

  return { isGuest, isReady, isSubscribed, setIsGuest, onLogoutClick };
};

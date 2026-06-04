"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify/unstyled";
import { setAuthToken } from "@/api";
import { ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY } from "@/constants/auth";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsGuest } = useAuthContext();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      try {
        setAuthToken(accessToken);
        localStorage.removeItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY);
        setIsGuest(false);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        console.error("Ошибка при работе с localStorage:", error);
        router.replace("/error?message=storage_failed");
      }

      router.replace("/");
      toast.success("Успешный вход в систему");
    } else {
      router.replace("/login?error=no_token");
    }
  }, [router, searchParams]);

  return <div></div>;
}

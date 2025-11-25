"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY } from "@/constants/auth";
import axios from "axios";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { setAuthToken } from "@/api";

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

      router.replace("/chat");
    } else {
      router.replace("/login?error=no_token");
    }
  }, [router, searchParams]);

  return <div></div>;
}

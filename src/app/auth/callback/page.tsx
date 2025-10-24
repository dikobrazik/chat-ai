"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/constants/auth";
import axios from "axios";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      try {
        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        router.replace("/");
      } catch (error) {
        console.error("Ошибка при работе с localStorage:", error);
        router.replace("/error?message=storage_failed");
      }
    } else {
      router.replace("/login?error=no_token");
    }
  }, [router, searchParams]);

  return <div></div>;
}

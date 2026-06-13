"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify/unstyled";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onGuestRegistered } = useAuthContext();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      try {
        onGuestRegistered(accessToken);
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

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify/unstyled";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { takeAuthRedirect } from "@/utils/auth-redirect";

export const useAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onGuestRegistered } = useAuthContext();
  const isHandledRef = useRef(false);

  useEffect(() => {
    if (isHandledRef.current) {
      return;
    }

    isHandledRef.current = true;

    const accessToken = searchParams.get("token");

    if (accessToken) {
      try {
        onGuestRegistered(accessToken);
      } catch (error) {
        console.error("Ошибка при работе с localStorage:", error);
        router.replace("/error?message=storage_failed");

        return;
      }

      router.replace(takeAuthRedirect());
      toast.success("Успешный вход в систему");
    } else {
      router.replace("/login?error=no_token");
    }
  }, [router, searchParams, onGuestRegistered]);
};

import type { PropsWithChildren } from "react";
import { useAdminSession } from "@/api";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { AdminCodeForm } from "../AdminCodeForm";

export const AdminGate = ({ children }: PropsWithChildren) => {
  const { data: session, error, isLoading } = useAdminSession();
  const { isGuest } = useAuthContext();

  if (isLoading) {
    return <Skeleton isLoading width={400} height={160} />;
  }

  if (error && isGuest) {
    return (
      <div className="flex flex-col items-start gap-3">
        <Text type="m" style="regular" color="#6F6F6F">
          Войдите в аккаунт администратора
        </Text>
        <Button variant="primary" href="/login">
          <Text type="s" style="regular">
            Войти
          </Text>
        </Button>
      </div>
    );
  }

  if (error || !session) {
    return (
      <Text type="m" style="regular" color="#6F6F6F">
        Раздел доступен только администраторам
      </Text>
    );
  }

  if (session.status === "code_required") {
    return <AdminCodeForm email={session.email} />;
  }

  return children;
};

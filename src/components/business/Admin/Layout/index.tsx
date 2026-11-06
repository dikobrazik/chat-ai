"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <div
      data-layout="wide"
      className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto pt-5 pb-10"
    >
      <div className="flex flex-col gap-4">
        <Text as="h1" type="xl">
          Админка
        </Text>
        <nav className="flex flex-row gap-2">
          <Button
            href="/admin/models"
            borderRadius="full"
            variant={pathname === "/admin/models" ? "base" : undefined}
          >
            <Text type="s" style="regular">
              Модели
            </Text>
          </Button>
          <Button
            href="/admin/balances"
            borderRadius="full"
            variant={pathname === "/admin/balances" ? "base" : undefined}
          >
            <Text type="s" style="regular">
              Балансы
            </Text>
          </Button>
        </nav>
      </div>
      {children}
    </div>
  );
};

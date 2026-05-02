"use client";

import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import styles from "./Sidebar.module.scss";

export const SettingsSidebar = () => {
  const path = usePathname();

  return (
    <>
      <div className="flex flex-row items-center gap-3">
        <Logo />

        <Text type="s" as="h1">
          Jonu AI
        </Text>
      </div>

      <div className="flex flex-col gap-1">
        <Button
          className={path === "/settings/profile" ? styles.active : ""}
          leftIcon={<Icon name="profile-circle" />}
          as="a"
          href="/settings/profile"
          replace
        >
          Аккаунт
        </Button>
        <Button
          className={path === "/settings/chat" ? styles.active : ""}
          leftIcon={<Icon name="setting" />}
          as="a"
          href="/settings/chat"
          replace
        >
          Управление&nbsp;данными
        </Button>
        <Button
          disabled
          className={path === "/settings/payment" ? styles.active : ""}
          leftIcon={<Icon name="card" />}
          rightIcon={
            <Badge size="s" variant="secondary">
              <Text type="s">Скоро</Text>
            </Badge>
          }
          as="a"
          href="/settings/payment"
          replace
        >
          Оплата
        </Button>
        <Button
          className={path === "/settings/about" ? styles.active : ""}
          leftIcon={<Icon name="info-circle" />}
          as="a"
          href="/settings/about"
          replace
        >
          О&nbsp;программе
        </Button>
        <Button
          className={path === "/settings/help" ? styles.active : ""}
          leftIcon={<Icon name="message-question" />}
          as="a"
          href="/settings/help"
          replace
        >
          Справка{" "}
        </Button>
      </div>
    </>
  );
};

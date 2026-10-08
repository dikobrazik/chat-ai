"use client";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import styles from "./Sidebar.module.scss";

export const SettingsSidebar = () => {
  const path = usePathname();
  const { isGuest } = useAuthContext();

  return (
    <>
      <div className={styles.brand}>
        <Logo />

        <Text type="s" as="h1">
          Jonu AI
        </Text>
      </div>

      <nav className={styles.navigation}>
        {!isGuest && (
          <>
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
          </>
        )}
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
      </nav>
    </>
  );
};

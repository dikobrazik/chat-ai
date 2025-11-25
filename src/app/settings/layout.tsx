"use client";

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./layout.module.scss";
import { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useMobile";
import { Sidebar } from "@/components/ui/Sidebar";

const NavigationSidebar = () => {
  return (
    <Sidebar>
      <Button size="sm" as="a" href="/settings/profile">
        Профиль
      </Button>
      <Button size="sm" as="a" href="/settings/sessions">
        Сессии
      </Button>
      <Button size="sm" as="a" href="/settings/sessions">
        Подписка
      </Button>

      <Button className={styles.logoutButton} size="sm" variant="danger">
        Выйти
      </Button>
    </Sidebar>
  );
};

export default function Layout({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  return (
    <div className={styles.page}>
      {!isMobile && <NavigationSidebar />}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          {isMobile && <NavigationSidebar />}
          <div className={styles.rightContent}>
            <Button as="a" href="/chat">
              Чат
            </Button>
            <AuthorizationButton />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

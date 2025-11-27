import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./layout.module.scss";
import { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";
import { Sidebar } from "@/components/ui/Sidebar";

const NavigationSidebar = ({ forMobile }: { forMobile?: boolean }) => {
  return (
    <Sidebar forMobile={forMobile}>
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
  return (
    <div className={styles.page}>
      <NavigationSidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <NavigationSidebar forMobile />
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

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./Layout.module.scss";
import { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Button as="a" href="/chat">
          Чат
        </Button>
        <AuthorizationButton />
      </header>
      <main>{children}</main>
    </div>
  );
}

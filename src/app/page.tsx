"use client";

import Button from "@/components/ui/Button";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.page}>
      Здесь будет лендинг
      <Button size="sm" className={styles.newChatButton} as="a" href="/chat">
        Новый чат
      </Button>
    </div>
  );
}

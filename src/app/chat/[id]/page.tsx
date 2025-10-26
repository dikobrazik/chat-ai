"use client";

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./page.module.scss";
import { Chat } from "@/components/business/Chat";
import { Sidebar } from "@/components/business/Sidebar";
import { useIsMobile } from "@/hooks/useMobile";

export default function ChatPage() {
  const isMobile = useIsMobile();

  return (
    <div className={styles.page}>
      {!isMobile && <Sidebar />}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          {isMobile && <Sidebar />}

          <AuthorizationButton />
        </header>

        <main className={styles.main}>
          <Chat />
        </main>
      </div>
    </div>
  );
}

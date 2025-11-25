"use client";

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./layout.module.scss";
import { ChatSidebar } from "@/components/business/Sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { ModelSelect } from "@/components/business/ModelSelect";
import { Subscription } from "@/components/business/Subscription";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className={styles.page}>
      {!isMobile && <ChatSidebar />}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          {isMobile && <ChatSidebar />}
          <div className={styles.leftContent}>
            <h1>Jonu</h1>
            <ModelSelect />
          </div>

          <div className={styles.rightContent}>
            <Subscription />
            <AuthorizationButton />
          </div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

"use client";

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./layout.module.scss";
import { Sidebar } from "@/components/business/Sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { ModelSelect } from "@/components/business/ModelSelect";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className={styles.page}>
      {!isMobile && <Sidebar />}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          {isMobile && <Sidebar />}
          <div className={styles.leftContent}>
            <h1>Jonu</h1>
            <ModelSelect />
          </div>

          <AuthorizationButton />
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./layout.module.scss";
import { ChatSidebar } from "@/components/business/Sidebar";
import { ModelSelect } from "@/components/business/ModelSelect";
import { Subscription } from "@/components/business/Subscription";
import { Sidebar } from "@/components/ui/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <Sidebar>
        <ChatSidebar />
      </Sidebar>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <Sidebar forMobile>
            <ChatSidebar />
          </Sidebar>
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

import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./page.module.scss";
import { Chat } from "@/components/business/Chat";
import { Sidebar } from "@/components/business/Sidebar";

export default function ChatPage() {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <AuthorizationButton />
        </header>

        <main className={styles.main}>
          <Chat />
        </main>
      </div>
    </div>
  );
}

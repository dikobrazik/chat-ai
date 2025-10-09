import { AuthorizationButton } from "@/components/business/Authorization";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <AuthorizationButton />
      </header>
    </div>
  );
}

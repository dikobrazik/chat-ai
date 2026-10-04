import Link from "next/link";
import { Text } from "@/components/ui/Text";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <div className="mt-4 mb-6 text-center">
      <Text
        as="p"
        className={styles.disclaimer}
        color="#9C9C9C"
        style="regular"
        type="xs"
      >
        Jonu AI может допускать ошибки. Используя сервис, вы соглашаетесь с{" "}
        <Link href="/terms">Условиями использования</Link> и{" "}
        <Link href="/privacy">Политикой конфиденциальности</Link>
      </Text>
    </div>
  );
};

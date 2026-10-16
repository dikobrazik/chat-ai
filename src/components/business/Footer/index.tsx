"use client";

import Link from "next/link";
import { Text } from "@/components/ui/Text";
import styles from "./Footer.module.scss";
import { useIsAcceptanceShown } from "./useIsAcceptanceShown";

export const Footer = () => {
  const isAcceptanceShown = useIsAcceptanceShown();

  return (
    <div className="mt-2 mb-3 text-center md:mt-4 md:mb-6">
      <Text
        as="p"
        className={styles.disclaimer}
        color="#9C9C9C"
        style="regular"
        type="xs"
      >
        {isAcceptanceShown ? (
          <>
            Jonu AI может ошибаться. Отправляя запрос, вы принимаете{" "}
            <Link href="/terms">Условия</Link> и{" "}
            <Link href="/privacy">Политику</Link>
          </>
        ) : (
          <>
            Jonu AI может ошибаться · <Link href="/terms">Условия</Link> ·{" "}
            <Link href="/privacy">Политика</Link>
          </>
        )}
      </Text>
    </div>
  );
};

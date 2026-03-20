"use client";

import type { PropsWithChildren } from "react";
import styles from "./layout.module.scss";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.page}>
      <div className={styles.mainContent}>
        <main>{children}</main>
      </div>
    </div>
  );
}

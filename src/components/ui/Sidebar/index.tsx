"use client";

import type { PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import styles from "./Sidebar.module.scss";

export const Sidebar = ({
  forMobile,
  children,
  isOpen,
  toggle,
}: PropsWithChildren<{
  forMobile?: boolean;
  isOpen: boolean;
  toggle: () => void;
}>) => {
  const isMobile = useIsMobile();

  if (Boolean(forMobile) !== isMobile) return null;

  if (isMobile) {
    return (
      <>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={cn(styles.layover, { [styles.open]: isOpen })}
          onClick={toggle}
        >
          <div
            className={cn(styles.sidebar, {
              [styles.mobile]: isMobile,
              [styles.open]: isOpen,
            })}
          >
            {children}
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(styles.sidebar, {
        [styles.mobile]: isMobile,
        [styles.open]: isOpen,
      })}
    >
      {children}
    </div>
  );
};

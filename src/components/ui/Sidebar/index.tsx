import { useIsMobile } from "@/hooks/useMobile";
import { useToggle } from "@/hooks/useToggle";
import { PropsWithChildren, useEffect } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { cn } from "@/lib/utils";
import styles from "./Sidebar.module.scss";

export const Sidebar = ({ children }: PropsWithChildren) => {
  const isMobile = useIsMobile();

  const { active: isOpen, toggle, toggleOn, toggleOff } = useToggle();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isMobile) {
        toggleOn();
      } else {
        toggleOff();
      }
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <Button leftIcon={<Icon name="menu" />} onClick={toggle}></Button>
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
            {!isMobile && (
              <Button
                className={styles.toggleButton}
                leftIcon={<Icon name="menu" />}
                onClick={toggle}
              />
            )}
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
      {!isMobile && (
        <Button
          className={styles.toggleButton}
          leftIcon={<Icon name="menu" />}
          onClick={toggle}
        />
      )}
      {children}
    </div>
  );
};

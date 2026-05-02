"use client";

import type { PropsWithChildren } from "react";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import styles from "./Expander.module.scss";

type ExpanderProps = {
  defaultOpen?: boolean;
  className?: string;
  Header: (props: { iconClassname: string }) => React.ReactNode;
};

export const Expander = (props: PropsWithChildren<ExpanderProps>) => {
  const { defaultOpen = false, children, className, Header } = props;
  const { active: isOpen, toggle } = useToggle(defaultOpen);

  return (
    <div className={cn(styles.expander, className)}>
      <div
        role="directory"
        onClick={toggle}
        onKeyUp={toggle}
        tabIndex={-1}
        className={cn("flex gap-3 height-full items-center", styles.header, {
          [styles.open]: isOpen,
        })}
      >
        {Header({ iconClassname: styles.icon })}
      </div>
      <div className={cn(styles.content, { [styles.open]: isOpen })}>
        {children}
      </div>
    </div>
  );
};

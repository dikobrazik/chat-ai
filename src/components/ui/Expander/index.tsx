import type { PropsWithChildren } from "react";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import Icon from "../Icon";
import { Text } from "../Text";
import styles from "./Expander.module.scss";

type ExpanderProps = {
  title: string;
  className?: string;
};

export const Expander = (props: PropsWithChildren<ExpanderProps>) => {
  const { active: isOpen, toggle } = useToggle(true);
  const { title, children, className } = props;

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
        <Icon className={styles.icon} color="#9C9C9C" name="chevron-down" />
        <Text className="text-[#9C9C9C]" style="regular">
          {title}
        </Text>
      </div>
      <div className={cn(styles.content, { [styles.open]: isOpen })}>
        {children}
      </div>
    </div>
  );
};

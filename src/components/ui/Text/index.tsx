import { cn } from "@/lib/utils";
import styles from "./Text.module.scss";

type TextProps = {
  className?: string;
  children: React.ReactNode;
  type?: "xl" | "l" | "m" | "s" | "xs";
  style?: "medium" | "regular";
  as?: React.ElementType;
  color?: string;
};

export const Text = ({
  children,
  type = "m",
  as: Component = "span",
  className,
  style = "medium",
  color,
}: TextProps) => {
  return (
    <Component
      className={cn(
        styles.text,
        styles[`body-${type}`],
        styles[style],
        className,
      )}
      style={{ color }}
    >
      {children}
    </Component>
  );
};

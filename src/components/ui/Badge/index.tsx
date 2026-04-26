import { cn } from "@/lib/utils";
import styles from "./Badge.module.scss";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  size?: "s" | "m" | "l";
  variant?: "primary" | "success" | "secondary" | "danger";
};

export const Badge = ({
  as,
  children,
  size = "m",
  variant = "primary",
}: Props) => {
  const Component = as || "div";
  return (
    <Component
      className={cn(
        styles.badge,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
      )}
    >
      {children}
    </Component>
  );
};

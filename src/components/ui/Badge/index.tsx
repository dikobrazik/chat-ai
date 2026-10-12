import { cn } from "@/lib/utils";
import styles from "./Badge.module.scss";

export type BadgeVariant = "primary" | "success" | "secondary" | "danger";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  size?: "s" | "m" | "l";
  variant?: BadgeVariant;
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

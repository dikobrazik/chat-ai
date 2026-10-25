import type { ComponentProps } from "react";
import type { ExtraProps } from "streamdown";
import { cn } from "@/lib/utils";
import styles from "./Message.module.scss";
import { hasLongToken } from "./markdown";

export const TableCell = ({
  node,
  className,
  children,
  ...props
}: ComponentProps<"td"> & ExtraProps) => (
  <td
    className={cn(
      "px-4 py-2 text-sm",
      className,
      hasLongToken(node) && styles.breakAnywhere,
    )}
    data-streamdown="table-cell"
    {...props}
  >
    {children}
  </td>
);

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./Switch.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Switch = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => (
    <label className={cn("relative", className)}>
      <input
        ref={ref}
        type="checkbox"
        className={`${styles.input} peer sr-only`}
        {...props}
      />

      <div className={styles.container}>
        <div className={styles.knob} />
      </div>
    </label>
  ),
);

Switch.displayName = "Switch";

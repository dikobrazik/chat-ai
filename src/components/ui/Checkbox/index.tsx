import {
  forwardRef,
  type InputHTMLAttributes,
  type PropsWithChildren,
} from "react";
import Icon from "@/components/ui/Icon";
import styles from "./Checkbox.module.scss";

type Props = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ children, className, ...props }, ref) => (
    <label className={`${styles.label} ${className ?? ""}`}>
      <input
        ref={ref}
        type="checkbox"
        className={`${styles.input} sr-only`}
        {...props}
      />
      <span className={styles.box} aria-hidden="true">
        <Icon name="check" size={12} />
      </span>
      {children}
    </label>
  ),
);

Checkbox.displayName = "Checkbox";

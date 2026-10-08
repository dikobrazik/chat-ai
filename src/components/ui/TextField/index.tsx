import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { Text } from "../Text";
import styles from "./TextField.module.scss";

type Props = {
  label?: string;
  value?: string;
  readOnly?: boolean;
  size?: "s" | "m" | "l";
  fullWidth?: boolean;
  error?: string;
  onValueChange?: (value: string) => void;
  leftIcon?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "readOnly" | "size" | "value">;

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      value,
      readOnly = false,
      size = "m",
      type = "text",
      fullWidth = false,
      error,
      leftIcon,
      className,
      onChange,
      onValueChange,
      ...other
    },
    ref,
  ) => {
    const textFieldId = useRef(crypto.randomUUID());

    return (
      <label
        htmlFor={textFieldId.current}
        className={cn(styles.label, className)}
      >
        {Boolean(label || error) && (
          <div className="mb-2 flex items-center gap-2">
            {label && (
              <Text as="span" className="mb-2" type="s">
                {label}
              </Text>
            )}
            {error && (
              <Text
                as="span"
                style="regular"
                className="mb-2"
                type="xs"
                color="#FC3F1D"
              >
                {error}
              </Text>
            )}
          </div>
        )}
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <input
          ref={ref}
          type={type}
          id={textFieldId.current}
          className={cn(styles.input, styles[`size-${size}`], {
            [styles.fullWidth]: fullWidth,
            [styles.error]: !!error,
          })}
          value={value}
          readOnly={readOnly}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.target.value);
          }}
          {...other}
        />
      </label>
    );
  },
);

TextField.displayName = "TextField";

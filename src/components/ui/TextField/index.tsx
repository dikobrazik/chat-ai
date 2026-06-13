import { type HTMLAttributes, useRef } from "react";
import { cn } from "@/lib/utils";
import { Text } from "../Text";
import styles from "./TextField.module.scss";

type Props = {
  label?: string;
  value?: string;
  readOnly?: boolean;
  size?: "s" | "m" | "l";
  type?: HTMLInputElement["type"];
  autoComplete?: HTMLInputElement["autocomplete"];
  fullWidth?: boolean;
  error?: string;
  onValueChange?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLInputElement>, "value" | "readOnly">;

export const TextField = ({
  label,
  value,
  readOnly = false,
  size = "m",
  type = "text",
  fullWidth = false,
  error,
  ...other
}: Props) => {
  const textFieldId = useRef(crypto.randomUUID());

  return (
    <label htmlFor={textFieldId.current} className={styles.label}>
      <div className="mb-2 flex items-center gap-2">
        {label && (
          <Text as="span" className="mb-2" type="s" color="#000000">
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
      <input
        type={type}
        id={textFieldId.current}
        className={cn(styles.input, styles[`size-${size}`], {
          [styles.fullWidth]: fullWidth,
          [styles.error]: !!error,
        })}
        value={value}
        readOnly={readOnly}
        autoComplete={other.autoComplete}
        {...other}
      />
    </label>
  );
};

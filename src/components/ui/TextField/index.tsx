import styles from "./TextField.module.scss";

type Props = {
  value?: string;
  readonly?: boolean;
  size?: "s" | "m" | "l";
  onChange?: (value: string) => void;
};

export const TextField = ({
  value,
  readonly = false,
  size = "m",
  onChange,
}: Props) => {
  return (
    <input
      type="text"
      className={`${styles.input} ${styles[`size-${size}`]}`}
      value={value}
      readOnly={readonly}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

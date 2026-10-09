import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import styles from "./ReceiptEmail.module.scss";

type Props = {
  value: string;
  hasError: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export const ReceiptEmail = ({ value, hasError, onChange, onBlur }: Props) => (
  <div className={styles.card}>
    <TextField
      label="Почта для чеков"
      type="email"
      autoComplete="email"
      placeholder="name@example.com"
      fullWidth
      size="l"
      value={value}
      error={hasError ? "Введите корректную почту" : undefined}
      onValueChange={onChange}
      onBlur={onBlur}
    />
    <Text type="xs" color="#6F6F6F" style="regular">
      Пришлём сюда кассовый чек и заранее напомним о списании
    </Text>
  </div>
);

import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon/icons";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS_MAP, type PaymentMethodId } from "../../constants";
import styles from "./PaymentMethods.module.scss";

type MethodProps = {
  id: PaymentMethodId;
  icon: IconName;
  title: string;
  description: string;
  selectedMethod: PaymentMethodId;
  onMethodSelect: (method: PaymentMethodId) => void;
};

const Method = ({
  id,
  icon,
  title,
  description,
  selectedMethod,
  onMethodSelect,
}: MethodProps) => {
  const isSelected = id === selectedMethod;

  return (
    <div
      className={cn(styles.method, {
        [styles.selected]: isSelected,
      })}
    >
      <label className={styles.head}>
        <input
          type="radio"
          name="payment-method"
          className="sr-only"
          value={id}
          checked={isSelected}
          onChange={() => onMethodSelect(id)}
        />
        <span className={styles.radio} aria-hidden="true" />
        <span className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <Icon name={icon} className={styles.icon} />
            <Text as="span" type="m">
              {title}
            </Text>
          </span>
          <Text as="span" style="regular" type="s" color="#9C9C9C">
            {description}
          </Text>
        </span>
      </label>
    </div>
  );
};

type Props = {
  selectedMethod: PaymentMethodId;
  onMethodSelect: (method: PaymentMethodId) => void;
};

export const PaymentMethods = ({ selectedMethod, onMethodSelect }: Props) => (
  <div role="radiogroup" aria-label="Способ оплаты" className={styles.methods}>
    <Method
      id={PAYMENT_METHODS_MAP.tbank}
      icon="card"
      title="Карта"
      description="МИР и российские карты"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    />
    <Method
      id={PAYMENT_METHODS_MAP.tpay}
      icon="tpay"
      title="TPay"
      description="Оплата в один клик через Т-Банк"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    />
    <Method
      id={PAYMENT_METHODS_MAP.sbp}
      icon="sbp"
      title="Оплата через СБП"
      description="Через приложение вашего банка"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    />
  </div>
);

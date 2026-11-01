import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS_MAP, type PaymentMethodId } from "../../constants";
import styles from "./PaymentMethods.module.scss";

type MethodProps = {
  id: PaymentMethodId;
  logo: ReactNode;
  title: string;
  description: string;
  selectedMethod: PaymentMethodId;
  onMethodSelect: (method: PaymentMethodId) => void;
};

const Method = ({
  id,
  logo,
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
        <span className="flex flex-col gap-0.5">
          <Text as="span" type="m">
            {title}
          </Text>
          <Text as="span" style="regular" type="s" color="#9C9C9C">
            {description}
          </Text>
        </span>
        <span className={styles.logos}>{logo}</span>
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
      logo={
        <>
          <Icon name="mir" size={12} />
          <Icon name="visa" size={12} />
          <Icon name="mastercard" size={18} />
        </>
      }
      title="Карта"
      description="Карты российских банков"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    />
    <Method
      id={PAYMENT_METHODS_MAP.tpay}
      logo={<Icon name="tpay" size={24} />}
      title="TPay"
      description="Оплата в один клик через Т‑Банк"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    />
    <Method
      id={PAYMENT_METHODS_MAP.sbp}
      logo={<Icon name="sbp" size={24} />}
      title="Оплата через СБП"
      description="Через приложение вашего банка"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    />
  </div>
);

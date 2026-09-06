import type { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS, type PaymentMethodId } from "../../constants";
import styles from "./PaymentMethods.module.scss";

type Props = {
  selectedMethod: PaymentMethodId;
  content: Partial<Record<PaymentMethodId, ReactNode>>;
  onMethodSelect: (method: PaymentMethodId) => void;
};

export const PaymentMethods = ({
  selectedMethod,
  content,
  onMethodSelect,
}: Props) => (
  <div role="radiogroup" aria-label="Способ оплаты" className={styles.methods}>
    {PAYMENT_METHODS.map((method) => {
      const isSelected = method.id === selectedMethod;

      return (
        <div
          key={method.id}
          className={cn(styles.method, { [styles.selected]: isSelected })}
        >
          <label className={styles.head}>
            <input
              type="radio"
              name="payment-method"
              className="sr-only"
              value={method.id}
              checked={isSelected}
              onChange={() => onMethodSelect(method.id)}
            />
            <span className={styles.radio} aria-hidden="true" />
            <Icon name={method.icon} className={styles.icon} />
            <span className="flex flex-col gap-0.5">
              <Text as="span" type="m">
                {method.title}
              </Text>
              <Text as="span" style="regular" type="s" color="#6F6F6F">
                {method.description}
              </Text>
            </span>
          </label>

          {isSelected && content[method.id] && (
            <div className={styles.content}>{content[method.id]}</div>
          )}
        </div>
      );
    })}
  </div>
);

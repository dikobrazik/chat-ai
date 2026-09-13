import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
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
  isComing?: boolean;
  selectedMethod: PaymentMethodId;
  children?: ReactNode;
  onMethodSelect: (method: PaymentMethodId) => void;
};

const Method = ({
  id,
  icon,
  title,
  description,
  isComing,
  selectedMethod,
  children,
  onMethodSelect,
}: MethodProps) => {
  const isSelected = id === selectedMethod;

  return (
    <div
      className={cn(styles.method, {
        [styles.selected]: isSelected,
        [styles.coming]: isComing,
      })}
    >
      <label className={styles.head}>
        <input
          type="radio"
          name="payment-method"
          className="sr-only"
          value={id}
          checked={isSelected}
          disabled={isComing}
          onChange={() => onMethodSelect(id)}
        />
        <span className={styles.radio} aria-hidden="true" />
        <Icon name={icon} className={styles.icon} />
        <span className="flex flex-col gap-0.5">
          <Text as="span" type="m">
            {title}
          </Text>
          <Text as="span" style="regular" type="s" color="#9C9C9C">
            {description}
          </Text>
        </span>
        {isComing && (
          <Badge as="span" size="s" variant="secondary">
            <Text style="regular" type="xs">
              Скоро
            </Text>
          </Badge>
        )}
      </label>

      {isSelected && children && (
        <div className={styles.content}>{children}</div>
      )}
    </div>
  );
};

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
    <Method
      isComing
      id={PAYMENT_METHODS_MAP.card}
      icon="card"
      title="Карта"
      description="МИР и российские карты"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    >
      {content[PAYMENT_METHODS_MAP.card]}
    </Method>
    <Method
      id={PAYMENT_METHODS_MAP.tpay}
      icon="flash-circle"
      title="TPay"
      description="Оплата в один клик через Т-Банк"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    >
      {content[PAYMENT_METHODS_MAP.tpay]}
    </Method>
    <Method
      id={PAYMENT_METHODS_MAP.sbp}
      icon="lock"
      title="Оплата по СБП"
      description="Через приложение вашего банка"
      selectedMethod={selectedMethod}
      onMethodSelect={onMethodSelect}
    >
      {content[PAYMENT_METHODS_MAP.sbp]}
    </Method>
  </div>
);

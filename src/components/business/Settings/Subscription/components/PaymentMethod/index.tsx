import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { ChangePaymentMethodModal } from "./ChangePaymentMethodModal";
import { PAYMENT_METHOD_ICON } from "./constants";
import styles from "./PaymentMethod.module.scss";
import { usePaymentMethodSection } from "./usePaymentMethodSection";

export const PaymentMethod = () => {
  const { paymentMethod, isChangeOpen, toggleChange, onRemove } =
    usePaymentMethodSection();

  if (!paymentMethod) {
    return null;
  }

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Text type="s">Способ оплаты</Text>
          <Text type="xs" color="#6F6F6F" style="regular">
            С него списывается оплата при продлении подписки
          </Text>
        </div>

        <div className={styles.method}>
          <div className="flex items-center gap-3">
            <Icon name={PAYMENT_METHOD_ICON[paymentMethod.type]} />
            <div className="flex flex-col">
              <Text type="s">
                {paymentMethod.type === "tpay" ? "TPay" : "СБП"}
              </Text>
              {paymentMethod.description && (
                <Text type="xs" color="#6F6F6F" style="regular">
                  {paymentMethod.description}
                </Text>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="base" onClick={toggleChange}>
              Изменить
            </Button>
            <Button variant="danger" onClick={onRemove}>
              Отвязать
            </Button>
          </div>
        </div>
      </section>

      <ChangePaymentMethodModal isOpen={isChangeOpen} onClose={toggleChange} />
    </>
  );
};

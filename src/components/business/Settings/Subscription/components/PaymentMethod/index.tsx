import Button from "@/components/ui/Button";
import { Section } from "../Section";
import { ChangePaymentMethodModal } from "./ChangePaymentMethodModal";
import { RemovePaymentMethodModal } from "./RemovePaymentMethodModal";
import { usePaymentMethodSection } from "./usePaymentMethodSection";

export const PaymentMethod = () => {
  const {
    paymentMethod,
    isChangeOpen,
    isRemoveOpen,
    toggleChange,
    toggleRemove,
  } = usePaymentMethodSection();

  if (!paymentMethod) {
    return null;
  }

  return (
    <>
      <Section
        title="Способ оплаты"
        description={
          <>
            {paymentMethod.type === "tpay" ? "TPay" : "СБП"}
            {paymentMethod.description && ` · ${paymentMethod.description}`}
          </>
        }
        actions={
          <>
            <Button variant="base" align="center" onClick={toggleChange}>
              Изменить
            </Button>
            <Button variant="danger" align="center" onClick={toggleRemove}>
              Отвязать
            </Button>
          </>
        }
      />

      <ChangePaymentMethodModal isOpen={isChangeOpen} onClose={toggleChange} />
      <RemovePaymentMethodModal isOpen={isRemoveOpen} onClose={toggleRemove} />
    </>
  );
};

import { usePaymentMethod } from "@/api";
import { useToggle } from "@/hooks/useToggle";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";

export const usePaymentMethodSection = () => {
  const { isActive } = useSubscriptionState();
  const { data: paymentMethod } = usePaymentMethod();
  const { active: isChangeOpen, toggle: toggleChange } = useToggle();
  const { active: isRemoveOpen, toggle: toggleRemove } = useToggle();

  return {
    paymentMethod: isActive ? paymentMethod : null,
    isChangeOpen,
    isRemoveOpen,
    toggleChange,
    toggleRemove,
  };
};

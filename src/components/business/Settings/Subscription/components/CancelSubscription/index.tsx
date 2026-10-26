import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useToggle } from "@/hooks/useToggle";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";
import { Section } from "../Section";
import { CancelSubscriptionModal } from "./CancelSubscriptionModal";

export const CancelSubscription = () => {
  const { periodEnd, isActive, isTrial } = useSubscriptionState();
  const { active, toggle } = useToggle();

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Section
        title={isTrial ? "Отмена пробного периода" : "Отмена подписки"}
        description={`Автопродление отключится, доступ сохранится до ${periodEnd}`}
        actions={
          <Button
            variant="danger"
            align="center"
            leftIcon={<Icon name="close-square" />}
            onClick={toggle}
          >
            Отменить
          </Button>
        }
      />

      <CancelSubscriptionModal isOpen={active} onClose={toggle} />
    </>
  );
};

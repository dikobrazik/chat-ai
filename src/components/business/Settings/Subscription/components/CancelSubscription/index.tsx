import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { useToggle } from "@/hooks/useToggle";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";
import { CancelSubscriptionModal } from "./CancelSubscriptionModal";

export const CancelSubscription = () => {
  const { isActive, isTrial } = useSubscriptionState();
  const { active, toggle } = useToggle();

  if (!isActive) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <Text color="#6F6F6F" type="xs">
          {isTrial ? "Отменить пробный период" : "Отменить подписку"}
        </Text>

        <Button
          variant="danger"
          leftIcon={<Icon name="close-square" />}
          onClick={toggle}
        >
          Отменить
        </Button>
      </div>

      <CancelSubscriptionModal isOpen={active} onClose={toggle} />
    </>
  );
};

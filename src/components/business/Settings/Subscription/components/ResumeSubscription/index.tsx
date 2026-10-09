import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useResumeSubscriptionRow } from "./useResumeSubscriptionRow";

export const ResumeSubscription = () => {
  const { periodEnd, canResume, isResuming, onResume } =
    useResumeSubscriptionRow();

  if (!canResume) {
    return null;
  }

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex flex-col gap-1">
        <Text type="xs">Автопродление отключено</Text>
        <Text color="#6F6F6F" type="xs" style="regular">
          Если возобновить, {periodEnd} спишем оплату за следующий период
        </Text>
      </div>

      <Button variant="base" loading={isResuming} onClick={onResume}>
        Возобновить
      </Button>
    </div>
  );
};

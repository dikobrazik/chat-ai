import Button from "@/components/ui/Button";
import { Section } from "../Section";
import { useResumeSubscriptionRow } from "./useResumeSubscriptionRow";

export const ResumeSubscription = () => {
  const { periodEnd, canResume, isResuming, onResume } =
    useResumeSubscriptionRow();

  if (!canResume) {
    return null;
  }

  return (
    <Section
      title="Автопродление отключено"
      description={`Если возобновить, ${periodEnd} спишем оплату за следующий период`}
      actions={
        <Button
          variant="base"
          align="center"
          loading={isResuming}
          onClick={onResume}
        >
          Возобновить
        </Button>
      }
    />
  );
};

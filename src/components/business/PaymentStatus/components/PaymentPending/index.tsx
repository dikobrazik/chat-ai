import { Spinner } from "@/components/ui/Spinner";
import type { WaitingStage } from "../../hooks/useWaitingStage";
import { StatusLayout } from "../StatusLayout";
import { SupportHint } from "../SupportHint";

type Props = {
  stage: WaitingStage;
};

export const PaymentPending = ({ stage }: Props) => (
  <StatusLayout
    live="polite"
    icon={
      <span className="flex size-12 items-center justify-center">
        <Spinner />
      </span>
    }
    title="Проверяем оплату"
    description={
      <>
        {stage === "checking" && "Это займёт несколько секунд"}
        {stage === "slow" &&
          "Обычно это занимает до минуты. Страницу можно закрыть — подписка включится сама"}
        {stage === "stuck" &&
          "Проверка идёт дольше обычного. Не оплачивайте повторно — подписка включится, как только банк подтвердит платёж"}
      </>
    }
  >
    {stage === "stuck" && <SupportHint />}
  </StatusLayout>
);

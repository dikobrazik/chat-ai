import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { usePaymentSuccess } from "../../hooks/usePaymentSuccess";
import { ChargeSummary } from "../ChargeSummary";
import { PaymentPending } from "../PaymentPending";
import { StatusLayout } from "../StatusLayout";
import { SupportHint } from "../SupportHint";
import styles from "./PaymentSuccess.module.scss";

export const PaymentSuccess = () => {
  const {
    isGuest,
    isReady,
    waitingStage,
    kind,
    planName,
    receiptEmail,
    nextChargeDate,
    ...summary
  } = usePaymentSuccess();

  if (isGuest) {
    return (
      <StatusLayout
        icon={<Icon name="info-circle" size={48} className={styles.infoIcon} />}
        title="Войдите в аккаунт"
        description="Подписка появится в аккаунте, с которого вы её оформляли"
      >
        <Button
          variant="primary"
          size="m"
          align="center"
          fullWidth
          href="/login"
        >
          <Text type="s" style="regular">
            Войти
          </Text>
        </Button>
      </StatusLayout>
    );
  }

  if (!isReady) {
    return <PaymentPending stage={waitingStage} />;
  }

  return (
    <StatusLayout
      live="polite"
      icon={
        <Icon name="tick-circle" size={48} className={styles.successIcon} />
      }
      title={
        <>
          {kind === "trial" && `Пробный период Jonu AI ${planName} начался`}
          {kind === "paid" && `Подписка Jonu AI ${planName} оформлена`}
          {kind === "active" && `Подписка Jonu AI ${planName} активна`}
        </>
      }
      description={
        kind === "trial" &&
        `Все возможности тарифа открыты до ${nextChargeDate}`
      }
    >
      <ChargeSummary kind={kind} nextChargeDate={nextChargeDate} {...summary} />

      <div className="flex flex-col gap-1">
        {receiptEmail && (
          <Text style="regular" type="s" color="#6F6F6F">
            Чек придёт на {receiptEmail}
          </Text>
        )}
        <Text style="regular" type="s" color="#6F6F6F">
          Отключить автопродление можно в любой момент в настройках подписки
        </Text>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button variant="primary" size="m" align="center" fullWidth href="/">
          <Text type="s" style="regular">
            Начать чат
          </Text>
        </Button>
        <Button
          variant="base"
          size="m"
          align="center"
          fullWidth
          href="/settings/profile"
        >
          <Text type="s" style="regular">
            Управление подпиской
          </Text>
        </Button>
      </div>

      <SupportHint />
    </StatusLayout>
  );
};

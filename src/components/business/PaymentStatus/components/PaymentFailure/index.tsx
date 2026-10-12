import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { usePaymentRetry } from "../../hooks/usePaymentRetry";
import { StatusLayout } from "../StatusLayout";
import { SupportHint } from "../SupportHint";
import styles from "./PaymentFailure.module.scss";

export const PaymentFailure = () => {
  const { isRetryAvailable, retryPath } = usePaymentRetry();

  return (
    <StatusLayout
      live="assertive"
      icon={<Icon name="close-circle" size={48} className={styles.errorIcon} />}
      title="Оплата не прошла"
      description="Попробуйте ещё раз или выберите другой способ оплаты"
    >
      <Button
        variant="primary"
        size="m"
        align="center"
        fullWidth
        href={retryPath}
      >
        <Text type="s" style="regular">
          {isRetryAvailable ? "Попробовать снова" : "Выбрать тариф"}
        </Text>
      </Button>

      <SupportHint />
    </StatusLayout>
  );
};

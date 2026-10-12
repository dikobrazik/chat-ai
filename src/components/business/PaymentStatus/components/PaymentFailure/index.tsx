import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { usePaymentRetry } from "../../hooks/usePaymentRetry";
import { StatusLayout } from "../StatusLayout";
import { SupportHint } from "../SupportHint";

export const PaymentFailure = () => {
  const { isRetryAvailable, retryPath } = usePaymentRetry();

  return (
    <StatusLayout
      live="assertive"
      icon={<Icon name="close-circle" size={48} color="#FC3F1D" />}
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

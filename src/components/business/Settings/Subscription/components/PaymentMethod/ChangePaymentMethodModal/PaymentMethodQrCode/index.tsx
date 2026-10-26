import { usePaymentMethodQr } from "@/api";
import { QrCode } from "@/components/business/Checkout/components/QrCode";

export const PaymentMethodQrCode = () => {
  const { data, isLoading } = usePaymentMethodQr();

  return <QrCode svg={data?.svg} isLoading={isLoading} />;
};

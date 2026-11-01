"use client";

import { useProfile, useSbpQr } from "@/api";
import { Text } from "@/components/ui/Text";
import { QrCode } from "../QrCode";
import { RetryMessage } from "../RetryMessage";

type Props = {
  tariff: string;
  sixMonths: boolean;
};

export const SbpQrCode = (props: Props) => {
  const { data: profile } = useProfile();
  const { data, isPending, isFetching, isError, refetch } = useSbpQr(
    props,
    profile?.id,
  );
  const isLoading = isPending || isFetching;

  if (!isLoading && isError) {
    return (
      <RetryMessage onRetry={() => refetch()}>
        Не удалось получить QR-код
      </RetryMessage>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <QrCode svg={data?.svg} isLoading={isLoading} />
      {!isLoading && (
        <Text style="regular" type="s" color="#6F6F6F">
          После оплаты в приложении банка эта страница обновится сама
        </Text>
      )}
    </div>
  );
};

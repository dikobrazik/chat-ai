"use client";

import { useSbpQr } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { QrCode } from "../QrCode";

type Props = {
  tariff: string;
  sixMonths: boolean;
};

export const SbpQrCode = (props: Props) => {
  const { data, isPending, isFetching, isError, refetch } = useSbpQr(props);
  const isLoading = isPending || isFetching;

  if (!isLoading && isError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <Text style="regular" type="s" color="#6F6F6F">
          Не удалось получить QR-код
        </Text>
        <Button variant="base" size="m" onClick={() => refetch()}>
          <Text type="s" style="regular">
            Обновить
          </Text>
        </Button>
      </div>
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

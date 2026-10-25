"use client";

import { useSbpQr } from "@/api";
import { Text } from "@/components/ui/Text";
import { QrCode } from "../QrCode";

type Props = {
  tariff: string;
  sixMonths: boolean;
};

export const SbpQrCode = (props: Props) => {
  const { data, isLoading } = useSbpQr(props);

  return (
    <div className="flex flex-col gap-3">
      <QrCode svg={data?.svg} isLoading={isLoading} />
      {!isLoading && (
        <Text style="regular" type="s" color="#6F6F6F">
          После оплаты в приложении банка эта страница обновится сама
        </Text>
      )}
    </div>
  );
};

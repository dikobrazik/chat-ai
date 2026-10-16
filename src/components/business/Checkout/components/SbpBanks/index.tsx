"use client";

import { useSbpQr } from "@/api";
import { QrCode } from "../QrCode";

type Props = {
  tariff: string;
  sixMonths: boolean;
};

export const SbpQrCode = (props: Props) => {
  const { data, isLoading } = useSbpQr(props);

  return <QrCode svg={data?.svg} isLoading={isLoading} />;
};

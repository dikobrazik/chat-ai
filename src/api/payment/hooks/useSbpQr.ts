import { useQuery } from "@tanstack/react-query";
import { generateQr } from "../api";
import type { TariffInfoPayload } from "../types";

export const useSbpQr = (tariffInfo: TariffInfoPayload) => {
  return useQuery<{ svg: string }>({
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryKey: ["getQr", tariffInfo.tariff, tariffInfo.sixMonths],
    queryFn: () => generateQr(tariffInfo),
  });
};

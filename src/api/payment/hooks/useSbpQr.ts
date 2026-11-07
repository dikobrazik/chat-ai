import { useQuery } from "@tanstack/react-query";
import { generateQr } from "../api";
import type { TariffInfoPayload } from "../types";

export const getSbpQrQueryKey = (
  tariffInfo: TariffInfoPayload,
  userId?: string,
) => ["getQr", userId, tariffInfo.tariff, tariffInfo.sixMonths];

export const useSbpQr = (tariffInfo: TariffInfoPayload, userId?: string) =>
  useQuery<{ svg: string }>({
    enabled: Boolean(userId),
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 25,
    gcTime: 1000 * 60 * 30,
    queryKey: getSbpQrQueryKey(tariffInfo, userId),
    queryFn: () => generateQr(tariffInfo),
  });

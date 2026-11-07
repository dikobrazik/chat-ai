import { useQuery } from "@tanstack/react-query";
import { getSbpLink } from "../api";
import type { TariffInfoPayload } from "../types";

export const getSbpLinkQueryKey = (
  tariffInfo: TariffInfoPayload,
  bankId?: string,
  userId?: string,
) => ["sbp-link", userId, tariffInfo.tariff, tariffInfo.sixMonths, bankId];

export const useSbpLink = (
  tariffInfo: TariffInfoPayload,
  bankId?: string,
  userId?: string,
) =>
  useQuery({
    enabled: Boolean(bankId && userId),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 25,
    gcTime: 1000 * 60 * 30,
    queryKey: getSbpLinkQueryKey(tariffInfo, bankId, userId),
    queryFn: () => getSbpLink({ ...tariffInfo, bankId: bankId ?? "" }),
  });

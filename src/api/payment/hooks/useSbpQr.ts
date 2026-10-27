import { useQuery } from "@tanstack/react-query";
import { useProfile } from "../../user";
import { generateQr } from "../api";
import type { TariffInfoPayload } from "../types";

export const useSbpQr = (tariffInfo: TariffInfoPayload) => {
  const { data: profile } = useProfile();

  return useQuery<{ svg: string }>({
    refetchInterval: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 25,
    gcTime: 1000 * 60 * 30,
    queryKey: ["getQr", profile?.id, tariffInfo.tariff, tariffInfo.sixMonths],
    queryFn: () => generateQr(tariffInfo),
  });
};

import { useQuery } from "@tanstack/react-query";
import type { MobileOs } from "@/utils/mobile-os";
import { getSbpBanks } from "../api";

export const getSbpBanksQueryKey = (os: MobileOs | null) => ["sbp-banks", os];

export const useSbpBanks = (os: MobileOs | null) =>
  useQuery({
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    queryKey: getSbpBanksQueryKey(os),
    queryFn: () => getSbpBanks(os),
  });

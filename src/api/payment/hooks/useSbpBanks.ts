import { useQuery } from "@tanstack/react-query";
import type { MobileOs } from "@/utils/mobile-os";
import { getSbpBanks } from "../api";

export const useSbpBanks = (os: MobileOs | null) =>
  useQuery({
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    queryKey: ["sbp-banks", os],
    queryFn: () => getSbpBanks(os),
  });

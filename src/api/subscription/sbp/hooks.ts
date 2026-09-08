import { useQuery } from "@tanstack/react-query";
import type { InitialPaymentPayload } from "../types";
import { generateQr } from "./api";

export const useSbpQr = (payment: InitialPaymentPayload) => {
  return useQuery<{ svg: string }>({
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryKey: ["getQr"],
    queryFn: () => generateQr(payment),
  });
};

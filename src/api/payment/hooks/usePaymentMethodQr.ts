import { useQuery } from "@tanstack/react-query";
import { generatePaymentMethodQr } from "../api";
import { PAYMENT_METHOD_QUERY_KEY } from "./usePaymentMethod";

export const usePaymentMethodQr = () =>
  useQuery({
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryKey: [...PAYMENT_METHOD_QUERY_KEY, "qr"],
    queryFn: generatePaymentMethodQr,
  });

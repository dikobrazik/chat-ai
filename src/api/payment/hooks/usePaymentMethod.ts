import { useQuery } from "@tanstack/react-query";
import { getPaymentMethod } from "../api";

export const PAYMENT_METHOD_QUERY_KEY = ["payment-method"];

export const usePaymentMethod = () =>
  useQuery({
    queryKey: PAYMENT_METHOD_QUERY_KEY,
    queryFn: getPaymentMethod,
  });

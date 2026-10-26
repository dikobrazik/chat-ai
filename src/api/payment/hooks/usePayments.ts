import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../api";

export const PAYMENTS_QUERY_KEY = ["payments"];

export const usePayments = () =>
  useQuery({
    queryKey: PAYMENTS_QUERY_KEY,
    queryFn: getPayments,
  });

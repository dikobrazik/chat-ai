import { useQuery } from "@tanstack/react-query";
import { getSbpBanksList } from "./api";

export const useSbpBanksList = () => {
  return useQuery({
    queryKey: ["sbpBanksList"],
    queryFn: getSbpBanksList,
  });
};

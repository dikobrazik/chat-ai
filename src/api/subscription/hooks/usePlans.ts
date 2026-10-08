import { useQuery } from "@tanstack/react-query";
import { getTariffs } from "../api";

export const PLANS_QUERY_KEY = ["subscription", "plans"];
export const SIX_MONTHS_PLANS_QUERY_KEY = [
  "subscription",
  "plans",
  "sixMonths",
];

export const usePlans = () => {
  const {
    data: plans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: () => getTariffs(),
  });

  const {
    data: sixMonthsPlans = [],
    isLoading: isSixMonthsPlansLoading,
    isError: isSixMonthsPlansError,
  } = useQuery({
    queryKey: SIX_MONTHS_PLANS_QUERY_KEY,
    queryFn: () => getTariffs({ sixMonths: true }),
  });

  return {
    plans,
    sixMonthsPlans,
    isLoading: isLoading || isSixMonthsPlansLoading,
    isError: isError || isSixMonthsPlansError,
  };
};

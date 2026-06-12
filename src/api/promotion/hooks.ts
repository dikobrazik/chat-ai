import { useQuery } from "@tanstack/react-query";
import {
  getFirstSubscriptionPromotion,
  getSixMonthsSubscriptionPromotion,
} from "./api";

export const useFirstSubscriptionPromotion = () => {
  const { data } = useQuery({
    queryKey: ["promotion", "first-subscription"],
    queryFn: getFirstSubscriptionPromotion,
  });

  return { data };
};

export const useSixMonthsSubscriptionPromotion = () => {
  const { data } = useQuery({
    queryKey: ["promotion", "six-months-subscription"],
    queryFn: getSixMonthsSubscriptionPromotion,
  });

  return { data };
};

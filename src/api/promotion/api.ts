import axios from "axios";

export type FirstSubscriptionPromotion = {
  freeDays: number;
};

export const getFirstSubscriptionPromotion = () =>
  axios
    .get<FirstSubscriptionPromotion | null>("/promotion/first-subscription")
    .then((response) => response.data);

export type SixMonthsSubscriptionPromotion = {
  discount: number;
};

export const getSixMonthsSubscriptionPromotion = () =>
  axios
    .get<SixMonthsSubscriptionPromotion | null>(
      "/promotion/six-months-subscription",
    )
    .then((response) => response.data);

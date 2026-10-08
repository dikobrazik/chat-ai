import axios from "axios";

export type PlanId = "base" | "plus" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  discount?: number;
  freeDays?: number;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  features: string[];
  nextChargeAt: string;
};

export const getTariffs = (params?: { sixMonths?: boolean }) =>
  axios.get<Plan[]>("/tariffs", { params }).then((response) => response.data);

export type Subscription = {
  id: string;
  user_id: string;
  plan: PlanId;
  status: string;
  current_period_start: string;
  current_period_end: string;
  isSixMonths: boolean;
  created_at: string;
};

export const getSubscription = () =>
  axios.get<Subscription>("/subscription").then((response) => response.data);

import axios from "axios";

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  freeDays?: number;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  features: string[];
};

export const getPlans = (params?: { sixMonths?: boolean }) =>
  axios
    .get<Plan[]>("/subscription/plans", { params })
    .then((response) => response.data);

export type SubscriptionResponse = {
  subscription: Subscription;
  payments: Payment[];
};

export type Payment = {
  id: string;
  user_id: string;
  subscription_id: string;
  payment_id: string;
  amount: number;
  status: string;
  payment_date: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan: "base" | "plus" | "pro";
  status: string;
  current_period_start: string;
  current_period_end: string;
  rebill_id: string;
  created_at: string;
};

export const getSubscription = () =>
  axios
    .get<SubscriptionResponse>("/subscription")
    .then((response) => response.data);

type InitPaymentPayload = {
  paymentType: string;
  plan: string;
  sixMonths: boolean;
};

export const initPayment = (payload: InitPaymentPayload) =>
  axios
    .post<{ PaymentURL: string }>("/subscription/init", payload)
    .then((response) => response.data);

export * from "./hooks";

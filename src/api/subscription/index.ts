import axios from "axios";

export type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

export const getPlans = () =>
  axios.get<Plan[]>("/subscription/plans").then((response) => response.data);

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
  plan: string;
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

export const initPayment = (payload: { paymentType: string; plan: string }) =>
  axios
    .post<{ PaymentURL: string }>("/subscription/init", payload)
    .then((response) => response.data);

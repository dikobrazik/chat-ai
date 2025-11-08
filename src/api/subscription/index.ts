import axios from "axios";

export type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

export const getPlans = () =>
  axios.get<Plan[]>("/subscription/plans").then((response) => response.data);

export const getSubscription = () =>
  axios
    .get<{ subscription: any; payments: any[] }>("/subscription")
    .then((response) => response.data);

export const initPayment = (payload: { paymentType: string; plan: string }) =>
  axios
    .post<{ PaymentURL: string }>("/subscription/init", payload)
    .then((response) => response.data);

import axios from "axios";

export type Plan = {
  id: string;
  name: string;
  amount: number;
  features: string[];
}

export const getPlans = () => axios.get<Plan[]>("/subscription/plans").then(response => response.data);

export const initPayment = (payload: {paymentType: string}) => axios.post<{PaymentURL: string}>("/subscription/init", payload).then(response => response.data);
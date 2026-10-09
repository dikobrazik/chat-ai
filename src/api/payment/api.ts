import axios from "axios";
import type {
  Payment,
  PaymentMethod,
  TariffInfoPayload,
  TPayResponse,
} from "./types";

export const getTPayLink = (payload: TariffInfoPayload) =>
  axios
    .post<TPayResponse>(`/payment/get-tpay-link`, payload)
    .then((response) => response.data);

export const generateQr = (payload: TariffInfoPayload) =>
  axios
    .post<{ svg: string }>(`/payment/generate-qr`, payload)
    .then((response) => response.data);

export const getPayments = () =>
  axios.get<Payment[]>(`/payment/history`).then((response) => response.data);

export const getPaymentMethod = () =>
  axios
    .get<PaymentMethod | null>(`/payment/method`)
    .then((response) => response.data);

export const removePaymentMethod = () =>
  axios.delete<void>(`/payment/method`).then((response) => response.data);

export const generatePaymentMethodQr = () =>
  axios
    .post<{ svg: string }>(`/payment/method/generate-qr`)
    .then((response) => response.data);

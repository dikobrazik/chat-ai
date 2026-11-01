import axios from "axios";
import type { MobileOs } from "@/utils/mobile-os";
import type {
  Payment,
  PaymentMethod,
  SbpBank,
  TariffInfoPayload,
  TbankResponse,
  TPayResponse,
} from "./types";

export const getTPayLink = (payload: TariffInfoPayload) =>
  axios
    .post<TPayResponse>(`/payment/get-tpay-link`, payload)
    .then((response) => response.data);

export const getTbankLink = (payload: TariffInfoPayload) =>
  axios
    .post<TbankResponse>(`/payment/get-tbank-link`, payload)
    .then((response) => response.data);

export const generateQr = (payload: TariffInfoPayload) =>
  axios
    .post<{ svg: string }>(`/payment/generate-qr`, payload)
    .then((response) => response.data);

type SbpLinkPayload = TariffInfoPayload & { bankId: string };

export const getSbpBanks = (os: MobileOs | null) =>
  axios
    .get<SbpBank[]>(`/payment/sbp/banks`, { params: { os } })
    .then((response) => response.data);

export const getSbpLink = (payload: SbpLinkPayload) =>
  axios
    .post<{ link: string }>(`/payment/sbp/link`, payload)
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

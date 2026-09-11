import axios from "axios";
import type { TariffInfoPayload, TPayResponse } from "./types";

export const getTPayLink = (payload: TariffInfoPayload) =>
  axios
    .post<TPayResponse>(`/payment/get-tpay-link`, payload)
    .then((response) => response.data);

export const generateQr = (payload: TariffInfoPayload) =>
  axios
    .post<{ svg: string }>(`/payment/generate-qr`, payload)
    .then((response) => response.data);

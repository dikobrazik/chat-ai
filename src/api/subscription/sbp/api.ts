import axios from "axios";
import type { InitialPaymentPayload } from "../types";

export const generateQr = (payload: InitialPaymentPayload) =>
  axios
    .post<{ svg: string }>("/subscription/sbp/generate-qr", payload)
    .then((response) => response.data);

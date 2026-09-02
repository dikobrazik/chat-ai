import axios from "axios";

type Bank = {
  BankId: string;
  NspkBankId: string;
  BankName: string;
  BankLogo: string;
  BankOrder: number;
};

export const getSbpBanksList = () =>
  axios
    .get<Bank[]>("/subscription/sbp/banks")
    .then((response) => response.data);

export const linkBank = ({ bankId }: { bankId: string }) =>
  axios
    .post<string>(`/subscription/sbp/${bankId}/link`)
    .then((response) => response.data);

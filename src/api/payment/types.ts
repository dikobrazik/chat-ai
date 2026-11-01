export type TariffInfoPayload = {
  tariff: string;
  sixMonths: boolean;
};

export type TPayResponse = { RedirectUrl: string; WebQR: string };

export type TbankResponse = { PaymentURL: string };

export type SbpBank = {
  BankId: string;
  NspkBankId: string;
  BankName: string;
  BankLogo: string;
  BankOrder: number;
};

export type SbpLinkPayload = TariffInfoPayload & { bankId: string };

export type Payment = {
  id: string;
  amount: number;
  status: "confirmed" | "rejected" | "refunded";
  payment_date: string;
  receipt_url: string | null;
};

export type PaymentMethod = {
  type: "tpay" | "sbp";
  description: string | null;
};

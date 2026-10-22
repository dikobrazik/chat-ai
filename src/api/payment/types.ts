export type TariffInfoPayload = {
  tariff: string;
  sixMonths: boolean;
  email?: string;
};

export type TPayResponse = { RedirectUrl: string; WebQR: string };

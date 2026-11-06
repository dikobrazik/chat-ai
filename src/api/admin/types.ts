export type ProviderStatus = "active" | "deprecated" | "shutdown";

export type ModelClass = "fast" | "advanced" | "heavy";

export type AdminModel = {
  id: string;
  provider: string;
  name: string;
  description: string;
  provider_status: ProviderStatus;
  shutdown_date: string | null;
  in_database: boolean;
  is_enabled: boolean;
  class: ModelClass | null;
};

export type AdminModels = {
  updated_at: string;
  models: AdminModel[];
};

export type ProviderBalance = {
  provider: string;
  balance: number | null;
  currency: string | null;
};

export type ProviderBalances = {
  updated_at: string;
  balances: ProviderBalance[];
};

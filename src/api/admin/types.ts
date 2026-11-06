export type ProviderStatus = "active" | "deprecated" | "shutdown";

export type CheckStatus = "ok" | "error";

export type CheckError =
  | "no_money"
  | "invalid_key"
  | "not_found"
  | "rate_limit"
  | "timeout"
  | "unknown";

export type AdminModel = {
  id: string;
  provider: string;
  name: string;
  description: string;
  for_image: boolean;
  release_date: string | null;
  provider_status: ProviderStatus;
  shutdown_date: string | null;
  on_site: boolean;
  check_status: CheckStatus | null;
  check_error: CheckError | null;
};

export type AdminModels = {
  updated_at: string;
  models: AdminModel[];
};

export type AdminSession = {
  status: "active" | "code_required";
  email: string;
};

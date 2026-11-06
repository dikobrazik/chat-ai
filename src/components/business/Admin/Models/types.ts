import type { CheckStatus, ProviderStatus } from "@/api";

export type StatusFilter = ProviderStatus | "all";

export type SiteFilter = "yes" | "no" | "all";

export type CheckFilter = CheckStatus | "all";

export type ModelsFilters = {
  provider: string;
  status: StatusFilter;
  site: SiteFilter;
  check: CheckFilter;
};

export type AttentionKey =
  | "toDisable"
  | "notResponding"
  | "soonDisabled"
  | "notOnSite";

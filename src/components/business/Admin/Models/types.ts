import type { CheckStatus, ProviderStatus } from "@/api";

export type ModelClass = "fast" | "advanced" | "heavy";

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

export type SortKey =
  | "provider"
  | "name"
  | "release_date"
  | "provider_status"
  | "shutdown_date"
  | "on_site"
  | "check_status"
  | "class";

export type ModelsSort = {
  key: SortKey;
  direction: "asc" | "desc";
};

import type { ProviderStatus } from "@/api";

export type StatusFilter = ProviderStatus | "all";

export type SiteFilter = "enabled" | "disabled" | "all";

export type ModelsFilters = {
  provider: string;
  status: StatusFilter;
  site: SiteFilter;
};

export type AttentionKey = "toDisable" | "soonDisabled" | "notOnSite";

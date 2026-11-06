import type { ProviderStatus } from "@/api";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { AttentionKey, ModelsFilters } from "./types";

export const DEFAULT_FILTERS: ModelsFilters = {
  provider: "all",
  status: "all",
  site: "all",
};

export const ATTENTION_FILTERS: Record<AttentionKey, ModelsFilters> = {
  toDisable: { provider: "all", status: "shutdown", site: "enabled" },
  soonDisabled: { provider: "all", status: "deprecated", site: "enabled" },
  notOnSite: { provider: "all", status: "active", site: "disabled" },
};

export const PROVIDER_STATUS_BADGES: Record<ProviderStatus, BadgeVariant> = {
  active: "success",
  deprecated: "danger",
  shutdown: "secondary",
};

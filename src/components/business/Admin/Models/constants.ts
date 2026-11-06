import type { CheckStatus, ProviderStatus } from "@/api";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { AttentionKey, ModelsFilters } from "./types";

export const DEFAULT_FILTERS: ModelsFilters = {
  provider: "all",
  status: "all",
  site: "all",
  check: "all",
};

export const ATTENTION_FILTERS: Record<AttentionKey, ModelsFilters> = {
  toDisable: { ...DEFAULT_FILTERS, status: "shutdown", site: "yes" },
  notResponding: { ...DEFAULT_FILTERS, site: "yes", check: "error" },
  soonDisabled: { ...DEFAULT_FILTERS, status: "deprecated", site: "yes" },
  notOnSite: { ...DEFAULT_FILTERS, status: "active", site: "no" },
};

export const ATTENTION_COLORS: Record<AttentionKey, string> = {
  toDisable: "#FC3F1D",
  notResponding: "#FC3F1D",
  soonDisabled: "#FF6B34",
  notOnSite: "#0F8AFF",
};

export const PROVIDER_STATUS_BADGES: Record<ProviderStatus, BadgeVariant> = {
  active: "success",
  deprecated: "danger",
  shutdown: "secondary",
};

export const CHECK_STATUS_BADGES: Record<CheckStatus, BadgeVariant> = {
  ok: "success",
  error: "danger",
};

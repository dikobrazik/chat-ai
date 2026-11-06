import type { AdminModel } from "@/api";
import { ATTENTION_FILTERS } from "./constants";
import type { AttentionKey, ModelsFilters } from "./types";

const matchesFilters = (model: AdminModel, filters: ModelsFilters) =>
  (filters.provider === "all" || model.provider === filters.provider) &&
  (filters.status === "all" || model.provider_status === filters.status) &&
  (filters.site === "all" || model.is_enabled === (filters.site === "enabled"));

export const filterModels = (models: AdminModel[], filters: ModelsFilters) =>
  models.filter((model) => matchesFilters(model, filters));

export const getProviders = (models: AdminModel[]) => [
  ...new Set(models.map((model) => model.provider)),
];

export const countAttention = (models: AdminModel[]) =>
  Object.fromEntries(
    Object.entries(ATTENTION_FILTERS).map(([key, filters]) => [
      key,
      filterModels(models, filters).length,
    ]),
  ) as Record<AttentionKey, number>;

export const getActiveAttention = (filters: ModelsFilters) =>
  (Object.keys(ATTENTION_FILTERS) as AttentionKey[]).find((key) => {
    const attentionFilters = ATTENTION_FILTERS[key];
    return (
      attentionFilters.provider === filters.provider &&
      attentionFilters.status === filters.status &&
      attentionFilters.site === filters.site
    );
  });

export const isModelToDisable = (model: AdminModel) =>
  model.provider_status === "shutdown" && model.is_enabled;

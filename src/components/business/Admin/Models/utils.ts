import type { AdminModel } from "@/api";
import { ATTENTION_FILTERS } from "./constants";
import type { AttentionKey, ModelsFilters } from "./types";

const matchesFilters = (model: AdminModel, filters: ModelsFilters) =>
  (filters.provider === "all" || model.provider === filters.provider) &&
  (filters.status === "all" || model.provider_status === filters.status) &&
  (filters.site === "all" || model.on_site === (filters.site === "yes")) &&
  (filters.check === "all" || model.check_status === filters.check);

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

const isSameFilters = (first: ModelsFilters, second: ModelsFilters) =>
  first.provider === second.provider &&
  first.status === second.status &&
  first.site === second.site &&
  first.check === second.check;

export const getActiveAttention = (filters: ModelsFilters) =>
  (Object.keys(ATTENTION_FILTERS) as AttentionKey[]).find((key) =>
    isSameFilters(ATTENTION_FILTERS[key], filters),
  );

export const needsAttention = (model: AdminModel) =>
  model.on_site &&
  (model.provider_status === "shutdown" || model.check_status === "error");

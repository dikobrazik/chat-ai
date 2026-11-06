import type { AdminModel } from "@/api";
import { PROVIDER_TITLES } from "../constants";
import {
  ATTENTION_FILTERS,
  CHECK_STATUS_ORDER,
  PROVIDER_STATUS_ORDER,
} from "./constants";
import type { AttentionKey, ModelsFilters, ModelsSort, SortKey } from "./types";

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

const getSortValue = (model: AdminModel, key: SortKey) => {
  switch (key) {
    case "provider":
      return PROVIDER_TITLES[model.provider] ?? model.provider;
    case "name":
      return model.name;
    case "release_date":
      return model.release_date;
    case "provider_status":
      return PROVIDER_STATUS_ORDER[model.provider_status];
    case "shutdown_date":
      return model.shutdown_date;
    case "on_site":
      return Number(model.on_site);
    case "check_status":
      return model.check_status && CHECK_STATUS_ORDER[model.check_status];
  }
};

const compareSortValues = (first: string | number, second: string | number) =>
  typeof first === "number" && typeof second === "number"
    ? first - second
    : String(first).localeCompare(String(second), "ru", { numeric: true });

export const sortModels = (models: AdminModel[], sort: ModelsSort | null) => {
  if (!sort) return models;

  const direction = sort.direction === "asc" ? 1 : -1;

  return [...models].sort((first, second) => {
    const firstValue = getSortValue(first, sort.key);
    const secondValue = getSortValue(second, sort.key);

    if (firstValue === null) return secondValue === null ? 0 : 1;
    if (secondValue === null) return -1;

    return compareSortValues(firstValue, secondValue) * direction;
  });
};

export const getNextSort = (
  current: ModelsSort | null,
  key: SortKey,
): ModelsSort =>
  current?.key === key && current.direction === "asc"
    ? { key, direction: "desc" }
    : { key, direction: "asc" };

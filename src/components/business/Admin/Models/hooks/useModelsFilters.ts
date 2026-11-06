import { useMemo, useState } from "react";
import type { AdminModel } from "@/api";
import { ATTENTION_FILTERS, DEFAULT_FILTERS } from "../constants";
import type { AttentionKey, ModelsFilters } from "../types";
import {
  countAttention,
  filterModels,
  getActiveAttention,
  getProviders,
} from "../utils";

export const useModelsFilters = (models: AdminModel[] = []) => {
  const [filters, setFilters] = useState<ModelsFilters>(DEFAULT_FILTERS);

  const filteredModels = useMemo(
    () => filterModels(models, filters),
    [models, filters],
  );
  const providers = useMemo(() => getProviders(models), [models]);
  const attentionCounts = useMemo(() => countAttention(models), [models]);

  const changeFilter = <K extends keyof ModelsFilters>(
    key: K,
    value: ModelsFilters[K],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  const toggleAttention = (key: AttentionKey) =>
    setFilters((current) =>
      getActiveAttention(current) === key
        ? DEFAULT_FILTERS
        : ATTENTION_FILTERS[key],
    );

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return {
    filters,
    filteredModels,
    providers,
    attentionCounts,
    activeAttention: getActiveAttention(filters),
    changeFilter,
    toggleAttention,
    resetFilters,
  };
};

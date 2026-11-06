import { useMemo, useState } from "react";
import type { AdminModel } from "@/api";
import type { ModelsSort, SortKey } from "../types";
import { getNextSort, sortModels } from "../utils";

export const useModelsSort = (models: AdminModel[]) => {
  const [sort, setSort] = useState<ModelsSort | null>(null);

  const sortedModels = useMemo(() => sortModels(models, sort), [models, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((current) => getNextSort(current, key));

  return { sort, sortedModels, toggleSort };
};

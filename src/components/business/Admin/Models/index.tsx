"use client";

import { useAdminModels } from "@/api";
import { Skeleton } from "@/components/ui/Skeleton";
import { AdminError } from "../components/AdminError";
import { UpdatedAt } from "../components/UpdatedAt";
import { Attention } from "./components/Attention";
import { Filters } from "./components/Filters";
import { ModelsTable } from "./components/ModelsTable";
import { useModelsFilters } from "./hooks/useModelsFilters";
import { useModelsSort } from "./hooks/useModelsSort";

export const AdminModels = () => {
  const { data, error, isLoading, refetch } = useAdminModels();
  const {
    filters,
    filteredModels,
    providers,
    attentionCounts,
    activeAttention,
    changeFilter,
    toggleAttention,
    resetFilters,
  } = useModelsFilters(data?.models);
  const { sort, sortedModels, toggleSort } = useModelsSort(filteredModels);

  if (error) {
    return <AdminError error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <UpdatedAt date={data?.updated_at} />
      <Skeleton isLoading={isLoading} width="100%" height={480}>
        <div className="flex flex-col gap-2">
          <Filters
            filters={filters}
            providers={providers}
            shownCount={filteredModels.length}
            totalCount={data?.models.length ?? 0}
            onChange={changeFilter}
          />
          <Attention
            counts={attentionCounts}
            active={activeAttention}
            onToggle={toggleAttention}
          />
        </div>
        <ModelsTable
          models={sortedModels}
          sort={sort}
          onSort={toggleSort}
          onReset={resetFilters}
        />
      </Skeleton>
    </div>
  );
};

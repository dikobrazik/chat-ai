"use client";

import { useAdminModels } from "@/api";
import { Skeleton } from "@/components/ui/Skeleton";
import { AdminError } from "../components/AdminError";
import { UpdatedAt } from "../components/UpdatedAt";
import { Attention } from "./components/Attention";
import { Filters } from "./components/Filters";
import { ModelsTable } from "./components/ModelsTable";
import { useModelsFilters } from "./hooks/useModelsFilters";
import { useToggleModel } from "./hooks/useToggleModel";

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
  const { toggleModel, updatingModelId } = useToggleModel();

  if (error) {
    return <AdminError error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <UpdatedAt date={data?.updated_at} />
      <Skeleton isLoading={isLoading} width="100%" height={480}>
        <Attention
          counts={attentionCounts}
          active={activeAttention}
          onToggle={toggleAttention}
        />
        <Filters
          filters={filters}
          providers={providers}
          shownCount={filteredModels.length}
          totalCount={data?.models.length ?? 0}
          onChange={changeFilter}
        />
        <ModelsTable
          models={filteredModels}
          updatingModelId={updatingModelId}
          onToggle={toggleModel}
          onReset={resetFilters}
        />
      </Skeleton>
    </div>
  );
};

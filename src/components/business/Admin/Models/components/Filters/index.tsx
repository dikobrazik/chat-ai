import { Text } from "@/components/ui/Text";
import { FilterSelect } from "../../../components/FilterSelect";
import { PROVIDER_TITLES } from "../../../constants";
import type { ModelsFilters } from "../../types";

type Props = {
  filters: ModelsFilters;
  providers: string[];
  shownCount: number;
  totalCount: number;
  onChange: <K extends keyof ModelsFilters>(
    key: K,
    value: ModelsFilters[K],
  ) => void;
};

export const Filters = ({
  filters,
  providers,
  shownCount,
  totalCount,
  onChange,
}: Props) => (
  <div className="flex flex-row flex-wrap items-center gap-2">
    <FilterSelect
      value={filters.provider}
      onChange={(value) => onChange("provider", value)}
      options={[
        { value: "all", label: "Все провайдеры" },
        ...providers.map((provider) => ({
          value: provider,
          label: PROVIDER_TITLES[provider] ?? provider,
        })),
      ]}
    />
    <FilterSelect
      value={filters.status}
      onChange={(value) => onChange("status", value)}
      options={[
        { value: "all", label: "Любой статус у провайдера" },
        { value: "active", label: "Активна" },
        { value: "deprecated", label: "Скоро отключат" },
        { value: "shutdown", label: "Выключили" },
      ]}
    />
    <FilterSelect
      value={filters.site}
      onChange={(value) => onChange("site", value)}
      options={[
        { value: "all", label: "На сайте: все" },
        { value: "enabled", label: "На сайте: да" },
        { value: "disabled", label: "На сайте: нет" },
      ]}
    />
    <Text type="s" style="regular" color="#9C9C9C" className="ml-auto">
      {shownCount} из {totalCount}
    </Text>
  </div>
);

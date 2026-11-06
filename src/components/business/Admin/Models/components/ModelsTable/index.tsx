import type { AdminModel } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import type { ModelsSort, SortKey } from "../../types";
import { ModelRow } from "../ModelRow";
import { SortableHeader } from "../SortableHeader";
import styles from "./ModelsTable.module.scss";

type Props = {
  models: AdminModel[];
  sort: ModelsSort | null;
  onSort: (key: SortKey) => void;
  onReset: () => void;
};

export const ModelsTable = ({ models, sort, onSort, onReset }: Props) => {
  if (!models.length) {
    return (
      <div className="flex flex-col items-start gap-3 py-5">
        <Text type="m" style="regular" color="#6F6F6F">
          По этим фильтрам моделей нет
        </Text>
        <Button variant="base" onClick={onReset}>
          <Text type="s" style="regular">
            Сбросить фильтры
          </Text>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <SortableHeader sortKey="provider" sort={sort} onSort={onSort}>
              Провайдер
            </SortableHeader>
            <SortableHeader sortKey="name" sort={sort} onSort={onSort}>
              Модель
            </SortableHeader>
            <SortableHeader sortKey="release_date" sort={sort} onSort={onSort}>
              Дата выхода
            </SortableHeader>
            <SortableHeader
              sortKey="provider_status"
              sort={sort}
              onSort={onSort}
            >
              Статус у провайдера
            </SortableHeader>
            <SortableHeader sortKey="shutdown_date" sort={sort} onSort={onSort}>
              Дата отключения
            </SortableHeader>
            <SortableHeader sortKey="on_site" sort={sort} onSort={onSort}>
              На сайте
            </SortableHeader>
            <SortableHeader sortKey="check_status" sort={sort} onSort={onSort}>
              Проверка
            </SortableHeader>
            <SortableHeader sortKey="class" sort={sort} onSort={onSort}>
              Класс
            </SortableHeader>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <ModelRow key={model.id} model={model} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

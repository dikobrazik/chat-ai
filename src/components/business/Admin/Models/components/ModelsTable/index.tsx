import type { AdminModel, ModelClass } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { ModelRow } from "../ModelRow";
import styles from "./ModelsTable.module.scss";

type Props = {
  models: AdminModel[];
  updatingModelId?: string | null;
  onClassChange: (model: AdminModel, modelClass: ModelClass) => void;
  onReset: () => void;
};

export const ModelsTable = ({
  models,
  updatingModelId,
  onClassChange,
  onReset,
}: Props) => {
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
            <th>
              <Text type="s">Провайдер</Text>
            </th>
            <th>
              <Text type="s">Модель</Text>
            </th>
            <th>
              <Text type="s">Дата выхода</Text>
            </th>
            <th>
              <Text type="s">Статус у провайдера</Text>
            </th>
            <th>
              <Text type="s">Дата отключения</Text>
            </th>
            <th>
              <Text type="s">На сайте</Text>
            </th>
            <th>
              <Text type="s">Проверка</Text>
            </th>
            <th>
              <Text type="s">Класс</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <ModelRow
              key={model.id}
              model={model}
              isClassUpdating={model.id === updatingModelId}
              onClassChange={onClassChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

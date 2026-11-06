import type { AdminModel } from "@/api";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { formatShortDate } from "@/utils/format-date";
import { ProviderName } from "../../../components/ProviderName";
import { isModelToDisable } from "../../utils";
import { ProviderStatusBadge } from "../ProviderStatusBadge";
import styles from "./ModelRow.module.scss";

type Props = {
  model: AdminModel;
  isUpdating: boolean;
  onToggle: (model: AdminModel) => void;
};

export const ModelRow = ({ model, isUpdating, onToggle }: Props) => (
  <tr className={cn({ [styles.toDisable]: isModelToDisable(model) })}>
    <td>
      <ProviderName provider={model.provider} />
    </td>
    <td>
      <div className="flex flex-col gap-1">
        <Text type="s" style="regular">
          {model.name}
        </Text>
        <Text type="xs" style="regular" color="#6F6F6F">
          {model.description}
        </Text>
      </div>
    </td>
    <td>
      <ProviderStatusBadge status={model.provider_status} />
    </td>
    <td>
      <Text type="s" style="regular" className="whitespace-nowrap">
        {model.shutdown_date ? formatShortDate(model.shutdown_date) : "—"}
      </Text>
    </td>
    <td>
      <div className="flex flex-row items-center gap-2">
        <Switch
          checked={model.is_enabled}
          disabled={!model.in_database || isUpdating}
          aria-label={`Показывать ${model.name} на сайте`}
          onChange={() => onToggle(model)}
        />
        <Text
          type="s"
          style="regular"
          color={model.in_database ? undefined : "#9C9C9C"}
          className="whitespace-nowrap"
        >
          {!model.in_database && "Нет в базе"}
          {model.in_database && (model.is_enabled ? "Да" : "Нет")}
        </Text>
      </div>
    </td>
    <td>
      <Text type="s" style="regular" className="whitespace-nowrap">
        {model.class === "fast" && "Быстрая"}
        {model.class === "advanced" && "Продвинутая"}
        {model.class === "heavy" && "Тяжёлая"}
        {!model.class && "—"}
      </Text>
    </td>
  </tr>
);

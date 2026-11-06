import type { AdminModel, ModelClass } from "@/api";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { formatShortDate } from "@/utils/format-date";
import { ProviderName } from "../../../components/ProviderName";
import { needsAttention } from "../../utils";
import { CheckStatus } from "../CheckStatus";
import { ClassSelect } from "../ClassSelect";
import { ProviderStatusBadge } from "../ProviderStatusBadge";
import styles from "./ModelRow.module.scss";

type Props = {
  model: AdminModel;
  isClassUpdating: boolean;
  onClassChange: (model: AdminModel, modelClass: ModelClass) => void;
};

export const ModelRow = ({ model, isClassUpdating, onClassChange }: Props) => (
  <tr className={cn({ [styles.attention]: needsAttention(model) })}>
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
      <Text type="s" style="regular" className="whitespace-nowrap">
        {model.release_date ? formatShortDate(model.release_date) : "—"}
      </Text>
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
      <Text type="s" style="regular">
        {model.on_site ? "Да" : "Нет"}
      </Text>
    </td>
    <td>
      <CheckStatus status={model.check_status} error={model.check_error} />
    </td>
    <td>
      {model.for_image ? (
        <Text type="s" style="regular">
          —
        </Text>
      ) : (
        <ClassSelect
          value={model.class}
          isPending={isClassUpdating}
          onChange={(modelClass) => onClassChange(model, modelClass)}
        />
      )}
    </td>
  </tr>
);

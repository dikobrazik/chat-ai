import type { ProviderStatus } from "@/api";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import { PROVIDER_STATUS_BADGES } from "../../constants";

type Props = {
  status: ProviderStatus;
};

export const ProviderStatusBadge = ({ status }: Props) => (
  <Badge variant={PROVIDER_STATUS_BADGES[status]} size="s">
    <Text type="xs" style="regular" className="whitespace-nowrap">
      {status === "active" && "Активна"}
      {status === "deprecated" && "Скоро отключат"}
      {status === "shutdown" && "Выключили"}
    </Text>
  </Badge>
);

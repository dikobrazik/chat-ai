import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { formatDateTime } from "@/utils/format-date";

type Props = {
  date?: string;
};

export const UpdatedAt = ({ date }: Props) => (
  <Skeleton isLoading={!date} width={280} height={16}>
    {date && (
      <Text type="xs" style="regular" color="#9C9C9C">
        Обновлено {formatDateTime(date)} · данные обновляются раз в сутки
      </Text>
    )}
  </Skeleton>
);

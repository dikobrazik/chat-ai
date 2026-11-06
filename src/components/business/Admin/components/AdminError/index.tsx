import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { isAccessError } from "../../utils";

type Props = {
  error: Error;
  onRetry: () => void;
};

export const AdminError = ({ error, onRetry }: Props) => {
  if (isAccessError(error)) {
    return (
      <Text type="m" style="regular" color="#6F6F6F">
        Раздел доступен только администраторам
      </Text>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Text type="m" style="regular" color="#6F6F6F">
        Не удалось загрузить данные
      </Text>
      <Button variant="base" onClick={onRetry}>
        <Text type="s" style="regular">
          Повторить
        </Text>
      </Button>
    </div>
  );
};

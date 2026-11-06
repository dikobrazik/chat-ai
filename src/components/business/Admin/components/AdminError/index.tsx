import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useAdminErrorRetry } from "./useAdminErrorRetry";

type Props = {
  error: Error;
  onRetry: () => void;
};

export const AdminError = ({ error, onRetry }: Props) => {
  const { isSessionLost, retry } = useAdminErrorRetry(error, onRetry);

  return (
    <div className="flex flex-col items-start gap-3">
      <Text type="m" style="regular" color="#6F6F6F">
        {isSessionLost
          ? "Сессия админки закончилась, войдите заново"
          : "Не удалось загрузить данные"}
      </Text>
      <Button variant="base" onClick={retry}>
        <Text type="s" style="regular">
          {isSessionLost ? "Войти" : "Повторить"}
        </Text>
      </Button>
    </div>
  );
};

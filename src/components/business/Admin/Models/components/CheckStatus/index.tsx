import type { CheckError, CheckStatus as CheckStatusValue } from "@/api";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import { CHECK_STATUS_BADGES } from "../../constants";

type Props = {
  status: CheckStatusValue | null;
  error: CheckError | null;
};

export const CheckStatus = ({ status, error }: Props) => {
  if (!status) {
    return (
      <Text type="s" style="regular">
        —
      </Text>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <Badge variant={CHECK_STATUS_BADGES[status]} size="s">
        <Text type="xs" style="regular" className="whitespace-nowrap">
          {status === "ok" ? "Ответ есть" : "Нет ответа"}
        </Text>
      </Badge>
      {error && (
        <Text
          type="xs"
          style="regular"
          color="#6F6F6F"
          className="whitespace-nowrap"
        >
          {error === "no_money" && "Нет денег на счёте"}
          {error === "invalid_key" && "Ключ не работает"}
          {error === "not_found" && "Модель недоступна"}
          {error === "rate_limit" && "Упёрлись в лимит запросов"}
          {error === "timeout" && "Не ответила вовремя"}
          {error === "unknown" && "Ошибка провайдера"}
        </Text>
      )}
    </div>
  );
};

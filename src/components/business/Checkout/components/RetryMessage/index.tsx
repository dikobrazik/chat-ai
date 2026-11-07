import type { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type Props = {
  onRetry: () => void;
};

export const RetryMessage = ({
  children,
  onRetry,
}: PropsWithChildren<Props>) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <Text style="regular" type="s" color="#6F6F6F">
      {children}
    </Text>
    <Button variant="base" size="m" onClick={onRetry}>
      <Text type="s" style="regular">
        Обновить
      </Text>
    </Button>
  </div>
);

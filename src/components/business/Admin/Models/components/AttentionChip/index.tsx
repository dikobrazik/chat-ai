import type { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type Props = {
  count: number;
  color: string;
  isActive: boolean;
  onClick: () => void;
};

export const AttentionChip = ({
  count,
  color,
  isActive,
  onClick,
  children,
}: PropsWithChildren<Props>) => (
  <Button
    borderRadius="full"
    variant={isActive ? "base" : undefined}
    onClick={onClick}
  >
    <Text type="xs" style="regular" color="#6F6F6F">
      {children}{" "}
      <Text type="xs" color={count ? color : "#9C9C9C"}>
        {count}
      </Text>
    </Text>
  </Button>
);

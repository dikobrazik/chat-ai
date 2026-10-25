import type { ReactNode } from "react";
import { Text } from "@/components/ui/Text";

type Props = {
  title: ReactNode;
  value?: ReactNode;
  hint: string;
};

export const SummaryRow = ({ title, value, hint }: Props) => (
  <div className="flex flex-col gap-1 text-left">
    <div className="flex justify-between gap-4">
      <Text type="s">{title}</Text>
      {value && <Text type="s">{value}</Text>}
    </div>
    <Text style="regular" type="xs" color="#6F6F6F">
      {hint}
    </Text>
  </div>
);

import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import type { AttentionKey } from "../../types";

type Props = {
  counts: Record<AttentionKey, number>;
  active?: AttentionKey;
  onToggle: (key: AttentionKey) => void;
};

export const Attention = ({ counts, active, onToggle }: Props) => (
  <div className="flex flex-row flex-wrap gap-2">
    <Button
      variant="base"
      borderRadius="full"
      pressed={active === "toDisable"}
      rightIcon={
        <Badge variant={counts.toDisable ? "danger" : "secondary"} size="s">
          <Text type="xs">{counts.toDisable}</Text>
        </Badge>
      }
      onClick={() => onToggle("toDisable")}
    >
      <Text type="s" style="regular">
        Выключили у провайдера, есть на сайте
      </Text>
    </Button>
    <Button
      variant="base"
      borderRadius="full"
      pressed={active === "soonDisabled"}
      rightIcon={
        <Badge variant={counts.soonDisabled ? "danger" : "secondary"} size="s">
          <Text type="xs">{counts.soonDisabled}</Text>
        </Badge>
      }
      onClick={() => onToggle("soonDisabled")}
    >
      <Text type="s" style="regular">
        Скоро отключат, есть на сайте
      </Text>
    </Button>
    <Button
      variant="base"
      borderRadius="full"
      pressed={active === "notOnSite"}
      rightIcon={
        <Badge variant={counts.notOnSite ? "primary" : "secondary"} size="s">
          <Text type="xs">{counts.notOnSite}</Text>
        </Badge>
      }
      onClick={() => onToggle("notOnSite")}
    >
      <Text type="s" style="regular">
        Доступны у провайдера, нет на сайте
      </Text>
    </Button>
  </div>
);

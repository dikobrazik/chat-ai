import { ATTENTION_COLORS } from "../../constants";
import type { AttentionKey } from "../../types";
import { AttentionChip } from "../AttentionChip";

type Props = {
  counts: Record<AttentionKey, number>;
  active?: AttentionKey;
  onToggle: (key: AttentionKey) => void;
};

export const Attention = ({ counts, active, onToggle }: Props) => (
  <div className="flex flex-row flex-wrap items-center gap-1">
    <AttentionChip
      count={counts.toDisable}
      color={ATTENTION_COLORS.toDisable}
      isActive={active === "toDisable"}
      onClick={() => onToggle("toDisable")}
    >
      Выключили у провайдера, есть на сайте
    </AttentionChip>
    <AttentionChip
      count={counts.notResponding}
      color={ATTENTION_COLORS.notResponding}
      isActive={active === "notResponding"}
      onClick={() => onToggle("notResponding")}
    >
      Не ответили на проверку
    </AttentionChip>
    <AttentionChip
      count={counts.soonDisabled}
      color={ATTENTION_COLORS.soonDisabled}
      isActive={active === "soonDisabled"}
      onClick={() => onToggle("soonDisabled")}
    >
      Скоро отключат, есть на сайте
    </AttentionChip>
    <AttentionChip
      count={counts.notOnSite}
      color={ATTENTION_COLORS.notOnSite}
      isActive={active === "notOnSite"}
      onClick={() => onToggle("notOnSite")}
    >
      Доступны у провайдера, нет на сайте
    </AttentionChip>
  </div>
);

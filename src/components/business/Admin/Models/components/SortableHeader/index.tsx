import type { PropsWithChildren } from "react";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import type { ModelsSort, SortKey } from "../../types";
import styles from "./SortableHeader.module.scss";

type Props = {
  sortKey: SortKey;
  sort: ModelsSort | null;
  onSort: (key: SortKey) => void;
};

export const SortableHeader = ({
  sortKey,
  sort,
  onSort,
  children,
}: PropsWithChildren<Props>) => {
  const direction = sort?.key === sortKey ? sort.direction : undefined;

  return (
    <th
      aria-sort={
        direction && (direction === "asc" ? "ascending" : "descending")
      }
    >
      <button
        type="button"
        className={styles.button}
        onClick={() => onSort(sortKey)}
      >
        <Text type="s">{children}</Text>
        <Icon
          name="arrow-up"
          size={16}
          className={cn(styles.icon, {
            [styles.active]: direction,
            [styles.descending]: direction === "desc",
          })}
        />
      </button>
    </th>
  );
};

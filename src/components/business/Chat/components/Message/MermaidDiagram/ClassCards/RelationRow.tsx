import { cn } from "@/lib/utils";
import type { ClassLink } from "../types";
import styles from "./ClassCards.module.scss";
import { getLinkCaption } from "./relations";

type Props = { link: ClassLink };

export const RelationRow = ({ link }: Props) => {
  const { caption, lineLabel } = getLinkCaption(link);

  return (
    <div className={styles.link}>
      <span className={styles.linkRow}>
        <span className={styles.linkName}>{link.from}</span>
        {link.fromCount && (
          <span className={styles.linkCount}>{link.fromCount}</span>
        )}
        <span
          className={cn(styles.linkLine, { [styles.dashed]: link.isDashed })}
        >
          {lineLabel}
        </span>
        {link.toCount && (
          <span className={styles.linkCount}>{link.toCount}</span>
        )}
        <span className={styles.linkName}>{link.to}</span>
      </span>
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
};

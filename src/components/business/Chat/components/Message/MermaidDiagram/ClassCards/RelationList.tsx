import type { ClassLink } from "../types";
import styles from "./ClassCards.module.scss";
import { getRelationDescription, getRelationTitle } from "./relations";

type Props = { links: ClassLink[] };

export const RelationList = ({ links }: Props) => (
  <div className={styles.relations}>
    <span className={styles.relationsTitle}>Связи</span>
    {links.map((link) => {
      const description = getRelationDescription(link);
      return (
        <div key={link.id} className={styles.relation}>
          <span>{getRelationTitle(link)}</span>
          {description && (
            <span className={styles.relationText}>{description}</span>
          )}
        </div>
      );
    })}
  </div>
);

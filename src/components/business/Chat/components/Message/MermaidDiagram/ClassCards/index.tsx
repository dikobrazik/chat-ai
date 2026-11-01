import { cn } from "@/lib/utils";
import type { ClassModel } from "../types";
import styles from "./ClassCards.module.scss";
import { getLinkCaption } from "./caption";
import { CLASS_ACCENT_COUNT } from "./constants";

type Props = { model: ClassModel };

export const ClassCards = ({ model }: Props) => (
  <section className={styles.classCards} aria-label="Визуализация классов">
    <div className={styles.grid}>
      {model.classes.map((card, index) => (
        <article
          key={card.id}
          className={cn(
            styles.card,
            styles[`accent-${index % CLASS_ACCENT_COUNT}`],
          )}
        >
          <header className={styles.header}>
            {card.annotations.map((annotation) => (
              <span key={annotation} className={styles.annotation}>
                «{annotation}»
              </span>
            ))}
            <span className={styles.name}>{card.name}</span>
          </header>
          {[card.members, card.methods]
            .filter((items) => items.length)
            .map((items) => (
              <div key={items[0].id} className={styles.section}>
                {items.map((item) => (
                  <span key={item.id}>{item.text}</span>
                ))}
              </div>
            ))}
        </article>
      ))}
    </div>
    {model.links.length > 0 && (
      <div className={styles.links}>
        {model.links.map((link) => {
          const { caption, lineLabel } = getLinkCaption(link);
          return (
            <div key={link.id} className={styles.link}>
              <span className={styles.linkRow}>
                <span className={styles.linkName}>{link.from}</span>
                {link.fromCount && (
                  <span className={styles.linkCount}>{link.fromCount}</span>
                )}
                <span
                  className={cn(styles.linkLine, {
                    [styles.dashed]: link.isDashed,
                  })}
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
        })}
      </div>
    )}
  </section>
);

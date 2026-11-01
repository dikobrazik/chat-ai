import { cn } from "@/lib/utils";
import type { ClassModel } from "../types";
import styles from "./ClassCards.module.scss";
import { CLASS_ACCENT_COUNT } from "./constants";
import { RelationList } from "./RelationList";
import { RelationRow } from "./RelationRow";
import { getClassNote } from "./relations";

type Props = { model: ClassModel };

export const ClassCards = ({ model }: Props) => {
  const [singleLink] = model.links;

  return (
    <section className={styles.classCards} aria-label="Визуализация классов">
      <div className={styles.grid}>
        {model.classes.map((card, index) => {
          const sections = [card.members, card.methods].filter(
            (items) => items.length,
          );
          const note = sections.length
            ? undefined
            : getClassNote(card.name, model.links);
          return (
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
              {sections.map((items) => (
                <div key={items[0].id} className={styles.section}>
                  {items.map((item) => (
                    <span key={item.id}>{item.text}</span>
                  ))}
                </div>
              ))}
              {note && (
                <span className={cn(styles.section, styles.note)}>{note}</span>
              )}
            </article>
          );
        })}
      </div>
      {model.links.length === 1 && <RelationRow link={singleLink} />}
      {model.links.length > 1 && <RelationList links={model.links} />}
    </section>
  );
};

import Link from "next/link";
import { Fragment } from "react";
import { Text } from "@/components/ui/Text";
import styles from "./Legal.module.scss";
import type { LegalBlock, LegalDocumentData } from "./types";

type Props = {
  doc: LegalDocumentData;
};

const LINK_PATTERN =
  /(https?:\/\/[^\s]*[^\s.,;:)»]|[\w.+-]+@[\w-]+\.[a-z]{2,})/g;

// ссылки на сам сайт ведём по относительному пути, чтобы работали и локально
const toHref = (part: string) => {
  if (part.includes("@")) {
    return `mailto:${part}`;
  }

  const url = new URL(part);
  return url.hostname === "jonu.ru" ? url.pathname : part;
};

const renderText = (text: string) =>
  text.split(LINK_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <Link key={part} href={toHref(part)}>
        {part}
      </Link>
    ) : (
      <Fragment key={part}>{part}</Fragment>
    ),
  );

const blockKey = (block: LegalBlock) => {
  if (block.type === "paragraph") {
    return block.text;
  }

  if (block.type === "list") {
    return block.items[0];
  }

  return block.rows[0]?.items[0];
};

const LegalBlockView = ({ block }: { block: LegalBlock }) => {
  if (block.type === "list") {
    return (
      <ul className={styles.list}>
        {block.items.map((item) => (
          <li key={item}>
            <Text type="s" style="regular">
              {renderText(item)}
            </Text>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "details") {
    return (
      <div className={styles.card}>
        {block.rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1">
            <Text type="xs" color="#6F6F6F" style="regular">
              {row.label}
            </Text>

            {row.items.length === 1 ? (
              <Text type="s" style="regular">
                {row.items[0]}
              </Text>
            ) : (
              <ul className={styles.list}>
                {row.items.map((item) => (
                  <li key={item}>
                    <Text type="s" style="regular">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Text as="p" type="s" style="regular">
      {renderText(block.text)}
    </Text>
  );
};

export const Legal = ({ doc }: Props) => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2">
        <Text as="h1" type="xl">
          {doc.title}
        </Text>

        {doc.edition && (
          <Text as="p" type="xs" color="#9C9C9C" style="regular">
            {doc.edition}
          </Text>
        )}
      </div>

      {doc.sections.map((section) => (
        <section
          key={section.title ?? doc.title}
          className="flex flex-col gap-4"
        >
          {section.title && (
            <Text as="h2" type="l">
              {section.title}
            </Text>
          )}

          {section.blocks.map((block) => (
            <LegalBlockView key={blockKey(block)} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
};

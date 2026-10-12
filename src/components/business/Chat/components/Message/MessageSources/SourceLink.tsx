import classNames from "classnames";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import styles from "./MessageSources.module.scss";
import { SourceFavicon } from "./SourceFavicon";
import type { MessageSource } from "./utils";

type Props = {
  source: MessageSource;
};

export const SourceLink = ({ source }: Props) => (
  <Button href={source.url} target="_blank" rel="noopener noreferrer" fullWidth>
    <span className={styles.source}>
      <span className={styles.site}>
        <SourceFavicon host={source.host} className={styles.listFavicon} />
        <Text
          type={source.title ? "xs" : "s"}
          style="regular"
          className={classNames(styles.name, {
            [styles.secondaryName]: source.title,
          })}
        >
          {source.name}
        </Text>
      </span>
      {source.title && (
        <Text type="s" style="regular" className={styles.title}>
          {source.title}
        </Text>
      )}
    </span>
  </Button>
);

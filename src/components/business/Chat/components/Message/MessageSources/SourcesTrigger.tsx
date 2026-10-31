import { Button, type ButtonProps } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import styles from "./MessageSources.module.scss";
import { SourceFavicon } from "./SourceFavicon";

type Props = ButtonProps & {
  faviconHosts: string[];
  hiddenCount: number;
};

export const SourcesTrigger = ({
  faviconHosts,
  hiddenCount,
  ...props
}: Props) => (
  <Button
    {...props}
    borderRadius="full"
    className={styles.trigger}
    aria-label="Источники"
    leftIcon={
      <span className={styles.deck}>
        {faviconHosts.map((host) => (
          <SourceFavicon
            key={host}
            host={host}
            className={styles.deckFavicon}
          />
        ))}
      </span>
    }
  >
    {hiddenCount > 0 && (
      <Text type="xs" style="regular" className={styles.more}>
        +{hiddenCount}
      </Text>
    )}
  </Button>
);

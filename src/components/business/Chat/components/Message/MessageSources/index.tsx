import { useMemo } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import type { ButtonProps } from "@/components/ui/Button";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/useMobile";
import { useToggle } from "@/hooks/useToggle";
import styles from "./MessageSources.module.scss";
import { SourceLink } from "./SourceLink";
import { SourcesTrigger } from "./SourcesTrigger";
import type { MessageSourcesData } from "./utils";

export const MessageSources = ({
  sources,
  faviconHosts,
  hiddenCount,
}: MessageSourcesData) => {
  const isMobile = useIsMobile();
  const { active: isSheetOpen, toggleOn, toggleOff } = useToggle();

  const Trigger = useMemo(
    () => (props: ButtonProps) => (
      <SourcesTrigger
        {...props}
        faviconHosts={faviconHosts}
        hiddenCount={hiddenCount}
      />
    ),
    [faviconHosts, hiddenCount],
  );

  if (!sources.length) return null;

  const list = (
    <div className={styles.list}>
      {sources.map((source) => (
        <SourceLink key={source.url} source={source} />
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <SourcesTrigger
          faviconHosts={faviconHosts}
          hiddenCount={hiddenCount}
          aria-haspopup="dialog"
          aria-expanded={isSheetOpen}
          onClick={toggleOn}
        />
        <BottomSheet title="Источники" isOpen={isSheetOpen} onClose={toggleOff}>
          {list}
        </BottomSheet>
      </>
    );
  }

  return (
    <Popover
      position={["right", "top", "bottom"]}
      align="start"
      Trigger={Trigger}
    >
      <div className={styles.dropdown}>
        <Text className={styles.dropdownTitle}>Источники</Text>
        {list}
      </div>
    </Popover>
  );
};

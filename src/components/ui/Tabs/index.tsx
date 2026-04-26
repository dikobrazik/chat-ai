import { type Key, type ReactNode, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "../Button";
import styles from "./Tabs.module.scss";

type Props = {
  tabs: {
    key: Key;
    label: ReactNode;
    content: ReactNode;
  }[];
};

export const Tabs = ({ tabs }: Props) => {
  const [activeTab, setActiveTab] = useState<Key>(tabs[0].key);

  const activeTabContent = useMemo(
    () => tabs.find((tab) => tab.key === activeTab)?.content,
    [activeTab, tabs],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className={styles.tabsSwitch}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            borderRadius="full"
            variant={tab.key === activeTab ? "base" : undefined}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div>{activeTabContent}</div>
    </div>
  );
};

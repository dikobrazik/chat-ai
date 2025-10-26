"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./Sidebar.module.scss";
import { getChats } from "@/api";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useMobile";
import Icon from "@/components/ui/Icon";
import { useToggle } from "@/hooks/useToggle";
import cn from "classnames";
import { useEffect } from "react";

const SidebarContent = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  const isMobile = useIsMobile();

  const { data: chats } = useQuery({
    refetchInterval: false,
    queryKey: ["chats"],
    queryFn: getChats,
  });

  return (
    <div
      className={cn(styles.sidebar, {
        [styles.mobile]: isMobile,
        [styles.open]: isOpen,
      })}
    >
      {!isMobile && (
        <Button
          className={styles.toggleButton}
          leftIcon={<Icon name="menu" />}
          onClick={toggle}
        />
      )}
      <Button size="sm" className={styles.newChatButton} as="a" href="/">
        Новый чат
      </Button>
      {chats?.map((chat) => (
        <Link
          key={chat.id}
          href={`/chat/${chat.id}`}
          className={styles.chatItem}
        >
          {chat.last_prompt}
        </Link>
      ))}
    </div>
  );
};

export const Sidebar = () => {
  const isMobile = useIsMobile();

  const { active: isOpen, toggle, toggleOn, toggleOff } = useToggle();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isMobile) {
        toggleOn();
      } else {
        toggleOff();
      }
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <Button leftIcon={<Icon name="menu" />} onClick={toggle}></Button>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={cn(styles.layover, { [styles.open]: isOpen })}
          onClick={toggle}
        >
          <SidebarContent isOpen={isOpen} toggle={toggle} />
        </div>
      </>
    );
  }

  return <SidebarContent isOpen={isOpen} toggle={toggle} />;
};

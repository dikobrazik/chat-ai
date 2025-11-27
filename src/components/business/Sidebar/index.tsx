"use client";

import { getChats } from "@/api";
import Button from "@/components/ui/Button";
import { Sidebar } from "@/components/ui/Sidebar";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import styles from "./Sidebar.module.scss";

export const ChatSidebar = () => {
  const { data: chats } = useQuery({
    refetchInterval: false,
    queryKey: ["chats"],
    queryFn: getChats,
  });

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        className={styles.newChatButton}
        as="a"
        href="/chat"
      >
        Новый чат
      </Button>
      {chats?.map((chat) => (
        <Link
          key={chat.id}
          href={`/chat/${chat.id}`}
          className={styles.chatItem}
          title={chat.title || chat.last_prompt || ""}
        >
          {chat.title || chat.last_prompt}
        </Link>
      ))}
    </>
  );
};

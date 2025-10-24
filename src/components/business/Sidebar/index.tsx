"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./Sidebar.module.scss";
import { getChats } from "@/api";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const Sidebar = () => {
  const { data: chats } = useQuery({
    refetchInterval: false,
    queryKey: ["chats"],
    queryFn: getChats,
  });

  return (
    <div className={styles.sidebar}>
      <Button as="a" href="/">
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

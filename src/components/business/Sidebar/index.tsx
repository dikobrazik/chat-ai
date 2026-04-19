"use client";

import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/api";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Expander } from "@/components/ui/Expander";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Sidebar as UISidebar } from "@/components/ui/Sidebar";
import { useSidebarState } from "@/components/ui/Sidebar/useSidebarState";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { stopPropagation } from "@/utils";
import { AuthorizationButton } from "../Authorization";
import styles from "./Sidebar.module.scss";

export const ChatSidebar = ({
  isOpen,
  toggleSidebar,
  forMobile,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  forMobile?: boolean;
}) => {
  const { isGuest } = useAuthContext();

  const { data: chats } = useQuery({
    refetchInterval: false,
    queryKey: ["chats"],
    queryFn: getChats,
  });

  if (!isOpen)
    return (
      <>
        <div className={styles.card}>
          <div className={cn(styles.cardInner)}>
            <Logo className={styles.cardFront} />
            <Button
              className={styles.cardBack}
              onClick={toggleSidebar}
              leftIcon={<Icon name="sidebar-toggle-on" />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button href="/chat" leftIcon={<Icon name="message-create" />} />
          <Button href="/chat" leftIcon={<Icon name="gallery" />} />
          <Button href="/chat" leftIcon={<Icon name="video-play" />} />
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <Logo />

          <Text type="s" as="h1">
            Jonu AI
          </Text>
        </div>

        <Button
          onClick={stopPropagation(toggleSidebar)}
          leftIcon={
            forMobile ? <Icon name="close" /> : <Icon name="sidebar-toggle" />
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className={styles.newChatButton}
          as="a"
          leftIcon={<Icon name="message-create" />}
          href="/chat"
        >
          Новый чат
        </Button>
        <Button
          className={styles.newChatButton}
          as="a"
          leftIcon={<Icon name="gallery" />}
          href="/chat"
        >
          Изображения
        </Button>
        <Button
          className={styles.newChatButton}
          as="a"
          leftIcon={<Icon name="video-play" />}
          href="/chat"
        >
          Видео
        </Button>
      </div>
      <Divider />
      <Expander title="Чаты" className={styles.chatsExpander}>
        <div className="flex flex-col h-full overflow-y-auto gap-1">
          {chats?.map((chat) => (
            <Button
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="flex-1 shrink-0 basis-9"
              title={chat.title || chat.last_prompt || ""}
            >
              <Text className="truncate" style="regular">
                {chat.title || chat.last_prompt}
              </Text>
            </Button>
          ))}
        </div>
      </Expander>
      {isGuest ? (
        <Banner
          title="Получайте персонализированные ответы"
          description="Войдите в систему, чтобы использовать историю чатов, создавать изображения и загружать файлы."
          action={
            <Button as="a" variant="primary" href="/login">
              <div className="w-full text-center">Войти</div>
            </Button>
          }
        />
      ) : (
        <AuthorizationButton />
      )}
    </>
  );
};

export const Sidebar = ({ forMobile }: { forMobile?: boolean }) => {
  const { isOpen, toggle } = useSidebarState();

  return (
    <UISidebar isOpen={isOpen} toggle={toggle} forMobile={forMobile}>
      <ChatSidebar
        isOpen={isOpen}
        toggleSidebar={toggle}
        forMobile={forMobile}
      />
    </UISidebar>
  );
};

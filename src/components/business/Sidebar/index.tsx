"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getChats } from "@/api";
import { Badge } from "@/components/ui/Badge";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Expander } from "@/components/ui/Expander";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import Popover from "@/components/ui/Popover";
import { Sidebar as UISidebar } from "@/components/ui/Sidebar";
import { useSidebarState } from "@/components/ui/Sidebar/useSidebarState";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { preventDefault, stopPropagation } from "@/utils";
import { AuthorizationButton } from "../Authorization";
import { ChatActions } from "../ChatActions";
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
          <Button href="/" leftIcon={<Icon name="message-create" />} />
          <Button
            disabled
            leftIcon={<Icon name="video-play" />}
            rightIcon={
              <Badge variant="secondary" size="s">
                <Text type="xs" style="regular">
                  Скоро
                </Text>
              </Badge>
            }
            href="/search"
          >
            Поиск в чатах
          </Button>
          <Button href="/image-chat" leftIcon={<Icon name="gallery" />} />
          <Button
            disabled
            leftIcon={<Icon name="video-play" />}
            rightIcon={
              <Badge variant="secondary" size="s">
                <Text type="xs" style="regular">
                  Скоро
                </Text>
              </Badge>
            }
            href="/"
          >
            Видео
          </Button>
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Link href="/" className="flex flex-row items-center gap-3">
          <Logo />

          <Text type="s" as="h1">
            Jonu AI
          </Text>
        </Link>

        <Button
          onClick={stopPropagation(toggleSidebar)}
          leftIcon={
            forMobile ? <Icon name="close" /> : <Icon name="sidebar-toggle" />
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button leftIcon={<Icon name="message-create" />} href="/">
          Новый чат
        </Button>
        <Button
          disabled
          leftIcon={<Icon name="video-play" />}
          rightIcon={
            <Badge variant="secondary" size="s">
              <Text type="xs" style="regular">
                Скоро
              </Text>
            </Badge>
          }
          href="/search"
        >
          Поиск в чатах
        </Button>
        <Button leftIcon={<Icon name="gallery" />} href="/image-chat">
          Изображения
        </Button>
        <Button
          disabled
          leftIcon={<Icon name="video-play" />}
          rightIcon={
            <Badge variant="secondary" size="s">
              <Text type="xs" style="regular">
                Скоро
              </Text>
            </Badge>
          }
          href="/"
        >
          Видео
        </Button>
      </div>
      <Divider />
      <Expander
        className="flex-1 pb-6"
        defaultOpen
        Header={() => (
          <>
            <Icon className={styles.icon} color="#9C9C9C" name="chevron-down" />
            <Text color="#9C9C9C" style="regular">
              Чаты
            </Text>
          </>
        )}
      >
        <div className="flex flex-col h-full gap-1">
          {chats?.map((chat) => (
            <Button
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="flex-1 shrink-0 basis-9 justify-between"
              title={chat.title || chat.last_prompt || ""}
            >
              <Text className="truncate" style="regular">
                {chat.title || chat.last_prompt}
              </Text>

              <Popover
                Trigger={(props) => (
                  <Button
                    {...props}
                    onClick={
                      props.onClick
                        ? preventDefault(stopPropagation(props.onClick))
                        : props.onClick
                    }
                    leftIcon={<Icon name="more" />}
                  />
                )}
                position="right"
                align="start"
              >
                <ChatActions />
              </Popover>
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

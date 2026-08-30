"use client";

import Link from "next/link";
import { useChats } from "@/api";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import Popover from "@/components/ui/Popover";
import { Sidebar as UISidebar } from "@/components/ui/Sidebar";
import { useSidebarState } from "@/components/ui/Sidebar/useSidebarState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { preventDefault, stopPropagation } from "@/utils";
import { ChatActions } from "../ChatActions";
import { Profile } from "../Profile";
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

  const { chats, isLoading } = useChats();
  const { active: isChatsOpen, toggle: toggleChats } = useToggle(true);

  if (!isOpen)
    return (
      <>
        {/* onClick на карточке, а не на кнопке — чтобы клик срабатывал и во время переворота, пока сверху ещё логотип */}
        <div className={styles.card} onClick={toggleSidebar}>
          <div className={cn(styles.cardInner)}>
            <Logo className={styles.cardFront} />
            <Button
              className={styles.cardBack}
              leftIcon={<Icon name="sidebar-toggle-on" />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            href="/"
            align="center"
            className={cn(styles.collapsedNavButton, styles.newChatButton)}
            leftIcon={<Icon name="message-create" />}
          />
          <Button
            href="/image-chat"
            align="center"
            className={cn(styles.collapsedNavButton, styles.imagesButton)}
            leftIcon={<Icon name="gallery" />}
          />
        </div>
        {/* профиль прижат к низу, как в развёрнутом сайдбаре */}
        <div className="mt-auto flex flex-col items-center">
          {isGuest ? (
            <Button
              href="/login"
              align="center"
              className={styles.collapsedProfileButton}
              leftIcon={<Icon name="profile-circle" />}
            />
          ) : (
            <Profile collapsed />
          )}
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        {/* pl-1: центр лого (36px) на оси центров иконок навигации (паддинг кнопки 12 + половина иконки 10) */}
        <Link
          href="/"
          className={cn(
            styles.logoLink,
            "flex flex-row items-center gap-3 pl-1",
          )}
        >
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
        <Button
          className={styles.newChatButton}
          leftIcon={<Icon name="message-create" />}
          href="/"
        >
          Новый чат
        </Button>
        <Button
          className={styles.imagesButton}
          leftIcon={<Icon name="gallery" />}
          href="/image-chat"
        >
          Изображения
        </Button>
      </div>
      <div className={cn(styles.chatsSection, "flex-1 flex flex-col")}>
        <button
          type="button"
          onClick={toggleChats}
          className={cn(
            styles.chatsHeader,
            "flex items-center gap-1 self-start",
            {
              [styles.open]: isChatsOpen,
            },
          )}
        >
          <Text style="regular">Чаты</Text>
          <Icon name="chevron-down" className={styles.chatsChevron} />
        </button>
        <div
          className={cn(styles.chatsCollapse, { [styles.open]: isChatsOpen })}
        >
          <div className="flex flex-col">
            {isLoading
              ? Array(30)
                  .fill(undefined)
                  .map((_, index) => (
                    <Skeleton
                      isLoading
                      key={`s_${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
                      className="mb-2"
                      height={40}
                    />
                  ))
              : chats?.map((chat) => (
                  <Button
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    className={cn(styles.chatItem, "shrink-0")}
                    title={chat.title || chat.last_prompt || ""}
                  >
                    <Text className="truncate" style="regular">
                      {chat.title || chat.last_prompt}
                    </Text>

                    <Popover
                      Trigger={(props) => (
                        <Button
                          {...props}
                          className={cn(props.className, styles.chatItemMore)}
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
                      <ChatActions chatId={chat.id} />
                    </Popover>
                  </Button>
                ))}
          </div>
        </div>
      </div>
      {isGuest ? (
        // -mx-1: внутренний паддинг баннера (16px) минус вынос за колонку (4px)
        // ставит текст на ось контента кнопок, фон выступает как ховер у кнопок
        <div className="-mx-1">
          <Banner
            title="Получайте ответы, адаптированные специально для вас"
            description="Войдите в систему, чтобы использовать историю чатов, создавать изображения и загружать файлы."
            action={
              <Button as="a" variant="primary" href="/login">
                <Text className="w-full text-center" type="s" as="div">
                  Войти
                </Text>
              </Button>
            }
          />
        </div>
      ) : (
        // pl-1.5: центр аватара (32px) на оси центров иконок — та же точка,
        // что в свёрнутом рейле, поэтому аватар не прыгает при сворачивании
        <div className="pl-1.5">
          <Profile />
        </div>
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

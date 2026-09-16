"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Sidebar as UISidebar } from "@/components/ui/Sidebar";
import { useSidebarState } from "@/components/ui/Sidebar/useSidebarState";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { stopPropagation } from "@/utils";
import { Profile } from "../Profile";
import { ChatsGroup } from "./components/ChatsGroup";
import styles from "./Sidebar.module.scss";
import { useChatGroups } from "./useChatGroups";
import { useShowUpsell } from "./useShowUpsell";

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
  const pathname = usePathname();
  const showUpsell = useShowUpsell();

  const { pinnedChats, unpinnedChats, isLoading } = useChatGroups();

  const handleSidebarClick = () => {
    if (forMobile) {
      toggleSidebar();
    }
  };

  if (!isOpen)
    return (
      <>
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
            onClick={handleSidebarClick}
            className={cn(styles.collapsedNavButton, styles.newChatButton, {
              [styles.active]: pathname === "/",
            })}
            leftIcon={<Icon name="message-create" />}
          />
          <Button
            href="/search"
            align="center"
            onClick={handleSidebarClick}
            className={cn(styles.collapsedNavButton, styles.newChatButton, {
              [styles.active]: pathname === "/search",
            })}
            leftIcon={<Icon name="search" />}
          />
          <Button
            href="/image-chat"
            align="center"
            onClick={handleSidebarClick}
            className={cn(styles.collapsedNavButton, styles.imagesButton, {
              [styles.active]: pathname === "/image-chat",
            })}
            leftIcon={<Icon name="gallery" />}
          />
        </div>
        <div className="mt-auto flex flex-col items-center gap-3">
          {isGuest ? (
            <Button
              href="/login"
              align="center"
              onClick={handleSidebarClick}
              className={styles.collapsedProfileButton}
              leftIcon={<Icon name="profile-circle" />}
            />
          ) : (
            <>
              {showUpsell && (
                <Button
                  href="/plans"
                  variant="primary"
                  align="center"
                  aria-label="Открыть полный доступ"
                  leftIcon={<Icon name="flash-circle" />}
                />
              )}
              <Profile collapsed />
            </>
          )}
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Link
          href="/"
          onClick={handleSidebarClick}
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
          className={cn(styles.newChatButton, {
            [styles.active]: pathname === "/",
          })}
          onClick={handleSidebarClick}
          leftIcon={<Icon name="message-create" />}
          href="/"
        >
          Новый чат
        </Button>
        <Button
          className={cn(styles.newChatButton, {
            [styles.active]: pathname === "/search",
          })}
          onClick={handleSidebarClick}
          leftIcon={<Icon name="search" />}
          href="/search"
        >
          Поиск в чатах
        </Button>
        <Button
          className={cn(styles.imagesButton, {
            [styles.active]: pathname === "/image-chat",
          })}
          onClick={handleSidebarClick}
          leftIcon={<Icon name="gallery" />}
          href="/image-chat"
        >
          Изображения
        </Button>
      </div>
      <div className={cn(styles.chatsSection, "flex-1 flex flex-col gap-2")}>
        {pinnedChats.length > 0 && (
          <ChatsGroup
            title="Закреплённые"
            chats={pinnedChats}
            onChatClick={handleSidebarClick}
          />
        )}
        <ChatsGroup
          title="Чаты"
          chats={unpinnedChats}
          isLoading={isLoading}
          onChatClick={handleSidebarClick}
        />
      </div>
      {isGuest ? (
        <div className="-mx-1">
          <Banner
            title="Получайте ответы, адаптированные специально для вас"
            description="Войдите в систему, чтобы использовать историю чатов, создавать изображения и загружать файлы."
            action={
              <Button
                onClick={handleSidebarClick}
                as="a"
                variant="primary"
                href="/login"
              >
                <Text className="w-full text-center" type="s" as="div">
                  Войти
                </Text>
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {showUpsell && (
            <div className={cn(styles.upsell, "-mx-1")}>
              <Banner
                variant="promo"
                title="Откройте полный доступ без ограничений"
                description="Создавайте быстрее — без лимитов и ожиданий"
                action={
                  <Button
                    onClick={handleSidebarClick}
                    as="a"
                    variant="secondary"
                    href="/plans"
                  >
                    <Text className="w-full text-center" type="s" as="div">
                      Открыть полный доступ
                    </Text>
                  </Button>
                }
              />
            </div>
          )}
          <div className="pl-1.5">
            <Profile />
          </div>
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

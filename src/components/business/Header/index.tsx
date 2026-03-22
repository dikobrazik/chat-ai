"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/useMobile";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { Sidebar } from "../Sidebar";
import { SubscriptionButton } from "../Subscription";
import styles from "./Header.module.scss";

export const Header = () => {
  const isMobile = useIsMobile();
  const { isGuest } = useAuthContext();

  return (
    <header className={styles.header}>
      <Sidebar forMobile />
      {isMobile ? (
        <div className="flex flex-row items-center gap-3">
          <Logo />

          <Text type="s" as="h1">
            Jonu AI
          </Text>
        </div>
      ) : (
        <div></div>
      )}

      <div className={styles.rightContent}>
        {!isGuest ? (
          <SubscriptionButton />
        ) : (
          <>
            <Button href="/login">
              <Text type="s" style="regular">
                Войти
              </Text>
            </Button>
            <Button
              className={styles.registerButton}
              variant="primary"
              href="/login"
            >
              <Text type="s" style="regular">
                Зарегистрироваться бесплатно
              </Text>
            </Button>
          </>
        )}
        <Popover
          Trigger={(props) => (
            <Button leftIcon={<Icon name="message-question" />} {...props} />
          )}
        >
          <div className="flex flex-col">
            <Button leftIcon={<Icon name="clipboard" />}>
              <Text type="s" style="regular">
                Тарифы
              </Text>
            </Button>
            <Button leftIcon={<Icon name="message-question" />}>
              <Text type="s" style="regular">
                Вопросы
              </Text>
            </Button>
          </div>
        </Popover>
      </div>
    </header>
  );
};

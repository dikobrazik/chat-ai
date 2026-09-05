"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/useMobile";
import styles from "./CookieBanner.module.scss";

const COOKIE_APPROVED_KEY = "cookie-approved";

export const CookieBanner = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsVisible(!window.localStorage.getItem(COOKIE_APPROVED_KEY));
    }
  }, []);

  const onDeclineClick = () => {
    setIsVisible(false);
    window.localStorage.setItem(COOKIE_APPROVED_KEY, "0");
  };

  const onAcceptClick = () => {
    setIsVisible(false);
    window.localStorage.setItem(COOKIE_APPROVED_KEY, "1");
  };

  if (!isVisible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Text as="h5" type="l">
          Мы используем cookie-файлы
        </Text>
        <Text as="h6" type="s" color="#6F6F6F" style="regular">
          Обязательные cookie-файлы нужны для входа в аккаунт и сохранения
          настроек. Аналитические cookie, помогающие понимать, как используется
          сервис, применяются только с вашего согласия. Подробнее — в{" "}
          <Link href="/privacy">Политике конфиденциальности</Link>.
        </Text>
      </div>

      <Button
        onClick={onDeclineClick}
        size={isMobile ? "m" : "x"}
        fullWidth={isMobile}
        className="flex-1 text-nowrap"
        variant="base"
        align="center"
      >
        Отклонить&nbsp;все
      </Button>
      <Button
        size={isMobile ? "m" : "x"}
        fullWidth={isMobile}
        onClick={onAcceptClick}
        className="flex-1"
        variant="primary"
        align="center"
      >
        Принять&nbsp;все
      </Button>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import styles from "./CookieBanner.module.scss";

const COOKIE_APPROVED_KEY = "cookie-approved";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsVisible(!window.localStorage.getItem(COOKIE_APPROVED_KEY));
    }
  }, []);

  const onDeclineClick = () => {
    setIsVisible(false);
    window.localStorage.setItem(COOKIE_APPROVED_KEY, "1");
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
          Мы используем cookie-файлы, чтобы помочь этому сайту функционировать,
          понимать использование услуг и поддерживать маркетинговые усилия.
          Посетите «Управление cookie-файлами», чтобы изменить настройки в любое
          время. Ознакомьтесь с нашей политикой использования cookie-файлов для
          получения дополнительной информации.
        </Text>
      </div>

      <Button
        onClick={onDeclineClick}
        className="flex-1 text-nowrap"
        variant="base"
      >
        Отклонить&nbsp;все
      </Button>
      <Button onClick={onAcceptClick} className="flex-1" variant="primary">
        Принять&nbsp;все
      </Button>
    </div>
  );
};

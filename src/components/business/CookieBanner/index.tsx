"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useIsMobile } from "@/hooks/useMobile";
import { useCookieConsentContext } from "@/providers/CookieConsentProvider/hooks";
import styles from "./CookieBanner.module.scss";

export const CookieBanner = () => {
  const isMobile = useIsMobile();
  const { isConsentRequired, saveConsent } = useCookieConsentContext();

  const onDeclineClick = () => {
    saveConsent(false);
  };

  const onAcceptClick = () => {
    saveConsent(true);
  };

  if (!isConsentRequired) return null;

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Text as="h5" type="l">
          Мы используем cookie-файлы
        </Text>
        <Text as="h6" type="s" color="#6F6F6F" style="regular">
          Обязательные cookie-файлы нужны для входа в аккаунт и сохранения
          настроек. Аналитические cookie Яндекс Метрики применяются только с
          вашего <Link href="/cookie-consent">согласия</Link>. Подробнее — в{" "}
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

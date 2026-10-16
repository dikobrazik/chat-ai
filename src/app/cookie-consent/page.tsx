import type { Metadata } from "next";
import { Legal } from "@/components/business/Legal";
import { COOKIE_CONSENT } from "@/components/business/Legal/constants";

export const metadata: Metadata = {
  title: "Согласие на обработку данных с помощью cookie — JonuAI",
  description:
    "Согласие пользователя сервиса Jonu AI на обработку данных с помощью аналитических файлов cookie Яндекс Метрики.",
};

export default function CookieConsentPage() {
  return <Legal doc={COOKIE_CONSENT} />;
}

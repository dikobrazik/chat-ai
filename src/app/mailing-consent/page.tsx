import type { Metadata } from "next";
import { Legal } from "@/components/business/Legal";
import { MAILING_CONSENT } from "@/components/business/Legal/constants";

export const metadata: Metadata = {
  title: "Согласие на рассылку — JonuAI",
  description:
    "Согласие пользователя сервиса Jonu AI на получение информационных и рекламных сообщений.",
};

export default function MailingConsentPage() {
  return <Legal doc={MAILING_CONSENT} />;
}

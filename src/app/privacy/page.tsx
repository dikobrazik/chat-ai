import type { Metadata } from "next";
import { Legal } from "@/components/business/Legal";
import { PRIVACY_POLICY } from "@/components/business/Legal/constants";

export const metadata: Metadata = {
  title: "Политика в отношении обработки персональных данных — JonuAI",
  description:
    "Политика ИП Калимуллина Р.Ш. в отношении обработки персональных данных пользователей сервиса Jonu AI.",
};

export default function PrivacyPage() {
  return <Legal doc={PRIVACY_POLICY} />;
}

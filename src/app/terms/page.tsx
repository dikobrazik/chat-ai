import type { Metadata } from "next";
import { Legal } from "@/components/business/Legal";
import { TERMS } from "@/components/business/Legal/constants";

export const metadata: Metadata = {
  title: "Пользовательское соглашение (публичная оферта) — JonuAI",
  description:
    "Публичная оферта на предоставление доступа к сервису Jonu AI: тарифы, оплата, подписка, возвраты и правила использования.",
};

export default function TermsPage() {
  return <Legal doc={TERMS} />;
}

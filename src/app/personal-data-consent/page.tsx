import type { Metadata } from "next";
import { Legal } from "@/components/business/Legal";
import { PERSONAL_DATA_CONSENT } from "@/components/business/Legal/constants";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных — JonuAI",
  description:
    "Согласие пользователя сервиса Jonu AI на обработку персональных данных.",
};

export default function PersonalDataConsentPage() {
  return <Legal doc={PERSONAL_DATA_CONSENT} />;
}

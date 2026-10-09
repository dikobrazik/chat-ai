import Link from "next/link";
import { Faq } from "@/components/business/Faq";
import { Text } from "@/components/ui/Text";
import { CancelSubscription } from "./components/CancelSubscription";
import { PaymentHistory } from "./components/PaymentHistory";
import { PaymentMethod } from "./components/PaymentMethod";
import { PlanSummary } from "./components/PlanSummary";
import { ResumeSubscription } from "./components/ResumeSubscription";
import { Section } from "./components/Section";
import { SUBSCRIPTION_FAQ } from "./constants";

export const SubscriptionSettings = () => (
  <div className="flex flex-col gap-6">
    <PlanSummary />

    <PaymentHistory />

    <PaymentMethod />

    <Section title="Частые вопросы">
      <Faq items={SUBSCRIPTION_FAQ} />

      <Text type="xs" color="#6F6F6F" style="regular">
        Условия подписки, автопродления и возврата — в{" "}
        <Link target="_blank" href="/terms">
          пользовательском соглашении
        </Link>
      </Text>
    </Section>

    <CancelSubscription />

    <ResumeSubscription />
  </div>
);

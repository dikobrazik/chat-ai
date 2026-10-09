import Link from "next/link";
import { Faq } from "@/components/business/Faq";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import { CancelSubscription } from "./components/CancelSubscription";
import { PaymentHistory } from "./components/PaymentHistory";
import { PaymentMethod } from "./components/PaymentMethod";
import { PlanDescription } from "./components/PlanDescription";
import { ResumeSubscription } from "./components/ResumeSubscription";
import { SubscriptionBanner } from "./components/SubscriptionBanner";
import { SUBSCRIPTION_FAQ } from "./constants";

export const SubscriptionSettings = () => (
  <div className="flex flex-col gap-6">
    <SubscriptionBanner />

    <PlanDescription />

    <PaymentHistory />

    <PaymentMethod />

    <CancelSubscription />

    <ResumeSubscription />

    <Divider />

    <section className="flex flex-col gap-6">
      <Text type="s">Частые вопросы</Text>

      <Faq items={SUBSCRIPTION_FAQ} />

      <Text type="xs" color="#6F6F6F" style="regular">
        Условия подписки, автопродления и возврата — в{" "}
        <Link target="_blank" href="/terms">
          пользовательском соглашении
        </Link>
      </Text>
    </section>
  </div>
);

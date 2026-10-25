import Link from "next/link";
import { SUPPORT_EMAIL_URL } from "@/components/business/Checkout/constants";
import { Text } from "@/components/ui/Text";

export const SupportHint = () => (
  <Text style="regular" type="s" color="#6F6F6F">
    Вопрос по оплате? <Link href={SUPPORT_EMAIL_URL}>Напишите нам</Link>
  </Text>
);

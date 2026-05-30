import Link from "next/link";
import { Text } from "@/components/ui/Text";

export const Footer = () => {
  return (
    <Text className="my-6" color="#9C9C9C" style="regular" type="xs">
      Jonu AI может допускать ошибки. Ознакомьтесь с{" "}
      <Link href="/terms">Условиями использования</Link> и{" "}
      <Link href="/privacy">Политикой конфиденциальности</Link>
    </Text>
  );
};

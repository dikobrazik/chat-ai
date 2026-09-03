import Link from "next/link";
import { Text } from "@/components/ui/Text";

export const Footer = () => {
  return (
    <div className="my-6 text-center">
      <Text color="#9C9C9C" style="regular" type="xs">
        Jonu AI может допускать ошибки. Используя сервис, вы соглашаетесь с{" "}
        <Link href="/terms">Условиями использования</Link> и{" "}
        <Link href="/privacy">Политикой конфиденциальности</Link>
      </Text>
    </div>
  );
};

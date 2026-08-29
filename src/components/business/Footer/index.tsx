import Link from "next/link";
import { Text } from "@/components/ui/Text";

type Props = {
  withRequisites?: boolean;
};

export const Footer = ({ withRequisites = false }: Props) => {
  return (
    <div className="my-6 flex flex-col gap-2 text-center">
      <Text color="#9C9C9C" style="regular" type="xs">
        Jonu AI может допускать ошибки. Ознакомьтесь с{" "}
        <Link href="/terms">Условиями использования</Link> и{" "}
        <Link href="/privacy">Политикой конфиденциальности</Link>
      </Text>

      {withRequisites && (
        <Text color="#9C9C9C" style="regular" type="xs">
          © 2026 ИП Калимуллин Р.Ш. · ИНН 025806380060 · ОГРНИП 319631300162300
          · <Link href="mailto:support@jonu.ru">support@jonu.ru</Link>
        </Text>
      )}
    </div>
  );
};

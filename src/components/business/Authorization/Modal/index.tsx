import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { BASE_URL } from "@/config";

export const AuthorizationModal = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l">
          Войти или зарегистрироваться
        </Text>
        <Text className="text-center" type="s" style="regular" color="#6F6F6F">
          Получайте более разумные ответы, загружайте файлы, изображения и
          многое другое
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          as="a"
          variant="base"
          size="m"
          fullWidth
          align="center"
          leftIcon={<Icon name="google" />}
          href={`${BASE_URL}/api/auth/g`}
        >
          Продолжить с Google
        </Button>
        <Button
          as="a"
          variant="base"
          fullWidth
          size="m"
          align="center"
          leftIcon={<Icon name="yandex" />}
          href={`${BASE_URL}/api/auth/ya`}
        >
          Продолжить с Yandex
        </Button>
      </div>

      <Text type="xs" style="regular" color="#9C9C9C" className="text-center">
        Продолжая, вы соглашаетесь с{" "}
        <Link href="#">Условиями использования</Link> и{" "}
        <Link href="#">Политикой конфиденциальности</Link>,<br />а также об
        обновлениях продукта и акциях
      </Text>
    </div>
  );
};

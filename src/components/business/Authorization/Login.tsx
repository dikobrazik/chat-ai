"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { BASE_URL } from "@/config";
import { useEmailAuth } from "@/providers/EmailAuthProvider/useEmailAuth";

type Inputs = {
  email: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),
});

export const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { setEmail } = useEmailAuth();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmail(data.email);
    router.push("/sign-up");
  };

  return (
    <div className="flex flex-col gap-8 px-16">
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

      <div className="flex items-center gap-3">
        <Divider></Divider>
        <Text color="#9C9C9C" style="regular" type="s">
          или
        </Text>
        <Divider></Divider>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          fullWidth
          size="l"
          {...register("email")}
          error={errors.email?.message}
        />
        <Button variant="primary" size="m" align="center" type="submit">
          Продолжить
        </Button>
        <Text className="self-center" style="regular" color="#6F6F6F" type="s">
          <Link href="/reset-password">Забыли пароль?</Link>
        </Text>
      </form>

      <Text type="xs" style="regular" color="#9C9C9C" className="text-center">
        Продолжая, вы соглашаетесь с{" "}
        <Link href="#">Условиями использования</Link> и{" "}
        <Link href="#">Политикой конфиденциальности</Link>,<br />а также об
        обновлениях продукта и акциях
      </Text>
    </div>
  );
};

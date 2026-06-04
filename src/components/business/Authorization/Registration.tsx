import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { postEmailSignIn } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { useEmailAuth } from "@/providers/EmailAuthProvider/useEmailAuth";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),

  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен"),
});

export const Registration = () => {
  const router = useRouter();
  const { email, setEmail } = useEmailAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { email },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setEmail(data.email);
    setServerError("");
    try {
      await postEmailSignIn(data.email, data.password);
      router.push("/verify-code");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.code === "INVALID_CREDENTIALS"
            ? "Неверные учетные данные"
            : "Ошибка при регистрации. Пожалуйста, попробуйте снова.",
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 px-16">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l">
          Зарегистрируйтесь в Jonu AI
        </Text>
        <Text className="text-center" type="s" style="regular" color="#6F6F6F">
          Уже есть аккаунт?
          <Link href="/login" className="ml-1">
            Войдите
          </Link>
        </Text>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          fullWidth
          size="l"
          type="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        ></TextField>
        <TextField
          label="Пароль"
          fullWidth
          size="l"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        ></TextField>
        <Button variant="primary" size="m" align="center" type="submit">
          Продолжить
        </Button>
        <Text className="self-center" style="regular" color="#6F6F6F" type="s">
          <Link href="/reset-password">Забыли пароль?</Link>
        </Text>
        {serverError && (
          <Text className="self-center" style="regular" color="red" type="s">
            {serverError}
          </Text>
        )}
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

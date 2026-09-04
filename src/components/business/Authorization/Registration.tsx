import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify/unstyled";
import * as yup from "yup";
import { postEmailSignIn } from "@/api";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
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
  const pathname = usePathname();

  const { email, setEmail, mailingConsent, setMailingConsent } = useEmailAuth();
  const [serverError, setServerError] = useState("");
  const isSignInPage = pathname === "/auth/sign-in";
  const { onGuestRegistered } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { email },
  });

  const { isPending, mutateAsync: signIn } = useMutation({
    mutationKey: ["postEmailSignIn"],
    mutationFn: ({ email, password }: Inputs) =>
      postEmailSignIn(email, password),
    onSuccess: (data) => {
      if (data.authCodeSent) {
        router.replace("/auth/verify-code");
        toast.success("Отправили код подтверждения на вашу почту");
      } else if (data.accessToken) {
        onGuestRegistered(data.accessToken);

        toast.success("Успешный вход в систему");

        window.location.href = "/";
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(
          error.response.data.code === "INVALID_CREDENTIALS"
            ? "Неверные учетные данные"
            : "Ошибка при регистрации. Пожалуйста, попробуйте снова.",
        );
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setEmail(data.email);
    setServerError("");

    await signIn(data);
  };

  return (
    <div className="flex flex-col gap-8 px-16">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l">
          {isSignInPage ? "Войдите" : "Зарегистрируйтесь"} в Jonu AI
        </Text>
        {!isSignInPage && (
          <Text
            className="text-center"
            type="s"
            style="regular"
            color="#6F6F6F"
          >
            Уже есть аккаунт?
            <Link href="/login" className="ml-1">
              Войдите
            </Link>
          </Text>
        )}
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          fullWidth
          size="l"
          type="email"
          autoComplete="email"
          readOnly={isPending}
          {...register("email")}
          error={errors.email?.message}
        ></TextField>
        <TextField
          label="Пароль"
          fullWidth
          size="l"
          type="password"
          autoComplete="new-password"
          readOnly={isPending}
          {...register("password")}
          error={errors.password?.message}
        ></TextField>
        <Button
          variant="primary"
          size="m"
          align="center"
          type="submit"
          loading={isPending}
        >
          Продолжить
        </Button>
        <Text className="self-center" style="regular" color="#6F6F6F" type="s">
          <Link replace href="/auth/password-reset">
            Забыли пароль?
          </Link>
        </Text>
        {serverError && (
          <Text className="self-center" style="regular" color="red" type="s">
            {serverError}
          </Text>
        )}
      </form>

      <div className="flex flex-col gap-4">
        <Checkbox
          checked={mailingConsent}
          onChange={(event) => setMailingConsent(event.target.checked)}
        >
          <Text type="xs" style="regular" color="#6F6F6F">
            Хочу получать{" "}
            <Link target="_blank" href="/mailing-consent">
              рассылку
            </Link>{" "}
            об обновлениях продукта и акциях
          </Text>
        </Checkbox>

        <Text type="xs" style="regular" color="#9C9C9C" className="text-center">
          Продолжая, вы соглашаетесь с{" "}
          <Link href="/terms">Условиями использования</Link> и{" "}
          <Link target="_blank" href="/privacy">
            Политикой конфиденциальности
          </Link>
          ,<br />а также даёте{" "}
          <Link target="_blank" href="/personal-data-consent">
            согласие на обработку персональных данных
          </Link>
        </Text>
      </div>
    </div>
  );
};

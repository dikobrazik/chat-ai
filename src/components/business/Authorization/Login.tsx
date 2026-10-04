"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { checkIsEmailRegistered } from "@/api";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { BASE_URL } from "@/config";
import { useEmailAuth } from "@/providers/EmailAuthProvider/useEmailAuth";
import { ProviderButton } from "./components/ProviderButton";
import styles from "./Login.module.scss";

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

  const { setEmail, mailingConsent, setMailingConsent } = useEmailAuth();

  const oauthQuery = mailingConsent ? "?mailing_consent=1" : "";

  const { isPending, mutate } = useMutation({
    mutationKey: ["check-email-registered"],
    mutationFn: checkIsEmailRegistered,
    onSuccess: ({ isRegistered }) => {
      if (isRegistered) {
        router.replace("/auth/sign-in");
      } else {
        router.replace("/auth/sign-up");
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmail(data.email);
    mutate(data.email);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 px-2 sm:px-10">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l" className="text-center">
          Войти или зарегистрироваться
        </Text>
        <Text className="text-center" type="s" style="regular" color="#6F6F6F">
          Получайте более разумные ответы, загружайте файлы, изображения и
          многое другое
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <ProviderButton
            icon="vk"
            disabled={isPending}
            href={`${BASE_URL}/api/auth/vk${oauthQuery}`}
          >
            Продолжить с VK ID
          </ProviderButton>
          <ProviderButton
            icon="yandex"
            disabled={isPending}
            href={`${BASE_URL}/api/auth/yandex${oauthQuery}`}
          >
            Продолжить с Яндекс
          </ProviderButton>
          <ProviderButton
            icon="mail-ru"
            disabled={isPending}
            href={`${BASE_URL}/api/auth/mailru${oauthQuery}`}
          >
            Продолжить с Mail.ru
          </ProviderButton>

          <div className="flex items-center gap-3">
            <Divider></Divider>
            <Text color="#9C9C9C" style="regular" type="s">
              или
            </Text>
            <Divider></Divider>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              aria-label="E-mail"
              placeholder="Введите почту"
              className={styles.emailField}
              fullWidth
              size="l"
              readOnly={isPending}
              {...register("email")}
              error={errors.email?.message}
            />
            <Button
              variant="primary"
              size="m"
              align="center"
              type="submit"
              loading={isPending}
            >
              Продолжить
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-3">
          <Text className="self-center" style="regular" type="s">
            <Link
              replace
              href="/auth/password-reset"
              className={styles.forgotPassword}
            >
              Забыли пароль?
            </Link>
          </Text>

          <Text
            type="xs"
            style="regular"
            color="#9C9C9C"
            className="text-center text-pretty"
          >
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

          <Checkbox
            className="self-center"
            checked={mailingConsent}
            onChange={(event) => setMailingConsent(event.target.checked)}
          >
            <Text type="xs" style="regular" color="#9C9C9C">
              Хочу получать{" "}
              <Link target="_blank" href="/mailing-consent">
                рассылку
              </Link>{" "}
              об обновлениях продукта и акциях
            </Text>
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

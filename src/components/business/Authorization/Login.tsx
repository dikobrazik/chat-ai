"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { ProviderButton } from "./components/ProviderButton";
import { useLogin } from "./useLogin";

export const Login = () => {
  const {
    register,
    errors,
    isPending,
    consentField,
    consentRef,
    onProviderClick,
    onSubmit,
  } = useLogin();

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
            onClick={onProviderClick}
            href="/api/auth/vk"
          >
            Продолжить с VK ID
          </ProviderButton>
          <ProviderButton
            icon="yandex"
            disabled={isPending}
            onClick={onProviderClick}
            href="/api/auth/yandex"
          >
            Продолжить с Яндекс
          </ProviderButton>
          <ProviderButton
            icon="mail-ru"
            disabled={isPending}
            onClick={onProviderClick}
            href="/api/auth/mailru"
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

          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <TextField
              aria-label="E-mail"
              placeholder="Введите почту"
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
          <Text
            className="self-center"
            style="regular"
            color="#6F6F6F"
            type="s"
          >
            <Link replace href="/auth/password-reset">
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
          </Text>

          <div ref={consentRef} className="flex flex-col gap-1 items-center">
            <Checkbox {...consentField}>
              <Text type="xs" style="regular" color="#9C9C9C">
                Даю{" "}
                <Link target="_blank" href="/personal-data-consent">
                  согласие на обработку персональных данных
                </Link>
              </Text>
            </Checkbox>
            {errors.personalDataConsent && (
              <Text
                className="text-center"
                type="xs"
                style="regular"
                color="#FC3F1D"
              >
                {errors.personalDataConsent.message}
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

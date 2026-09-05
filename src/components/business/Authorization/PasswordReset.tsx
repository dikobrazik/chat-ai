import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify/unstyled";
import * as yup from "yup";
import { postResetPassword } from "@/api";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { useEmailAuth } from "@/providers/EmailAuthProvider/useEmailAuth";

type Inputs = {
  email: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Неверный формат email")
    .required("Email обязателен"),
});

export const PasswordReset = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const {
    isPending,
    isSuccess,
    mutate: resetPassword,
  } = useMutation({
    mutationKey: ["postResetPassword"],
    mutationFn: postResetPassword,
    onSuccess: () => {
      toast.success(
        "Письмо для восстановления пароля отправлено на вашу почту",
      );
    },
  });

  const { email, setEmail } = useEmailAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setEmail(data.email);
    resetPassword(data.email);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-8 px-2 sm:px-16">
        <div className="flex flex-col gap-2 items-center">
          <Text as="h2" type="l" className="text-center">
            Для восстановления аккаунта перейдите по ссылке в письме
          </Text>
          <Text
            className="text-center"
            type="s"
            style="regular"
            color="#6F6F6F"
          >
            Отправили письмо на {email}
          </Text>
        </div>
        <Button
          size="m"
          align="center"
          variant="primary"
          onClick={() => router.back()}
        >
          Отлично
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-2 sm:px-16">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l">
          Восстановление доступа
        </Text>
        <Text className="text-center" type="s" style="regular" color="#6F6F6F">
          Отправим ссылку для восстановления доступа на e-mail
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
          readOnly={isPending}
          error={errors.email?.message}
        ></TextField>
        <Button
          variant="primary"
          size="m"
          align="center"
          type="submit"
          loading={isPending}
        >
          Сбросить пароль
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Divider></Divider>
        <Text color="#9C9C9C" style="regular" type="s">
          или
        </Text>
        <Divider></Divider>
      </div>

      <Button href="/login" align="center" size="m" variant="base">
        Войти по-другому
      </Button>
    </div>
  );
};

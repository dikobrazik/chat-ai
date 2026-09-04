import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { postResetNewPasswordVerify } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать") // Matches the password field
    .required("Подтверждение пароля обязательно"), // Required field
});

export const NewPassword = () => {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { isPending, mutateAsync: saveNewPassword } = useMutation({
    mutationKey: ["postResetNewPasswordVerify"],
    mutationFn: ({ code, password }: { code: string; password: string }) =>
      postResetNewPasswordVerify(code, password),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    saveNewPassword({
      code: searchParams.get("code") || "",
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col gap-8 px-16">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l">
          Восстановление доступа
        </Text>
        <Text className="text-center" type="s" style="regular" color="#6F6F6F">
          Придумайте новый надёжный пароль
        </Text>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Новый пароль"
          fullWidth
          size="l"
          readOnly={isPending}
          type="password"
          {...register("password")}
          error={errors.password?.message}
        ></TextField>
        <TextField
          label="Подтвердите новый пароль"
          fullWidth
          size="l"
          readOnly={isPending}
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        ></TextField>
        <Button
          variant="primary"
          size="m"
          align="center"
          type="submit"
          loading={isPending}
        >
          Сохранить
        </Button>
      </form>
    </div>
  );
};

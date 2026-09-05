import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify/unstyled";
import * as yup from "yup";
import { postEmailVerify } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { useEmailAuth } from "@/providers/EmailAuthProvider/useEmailAuth";

type Inputs = {
  code: string;
};

const schema = yup.object({
  code: yup
    .string()
    .length(6, "Код должен быть ровно 6 символов")
    .required("Код обязателен"),
});

export const VerifyCode = () => {
  const { onGuestRegistered } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { email } = useEmailAuth();

  const { isPending, mutate: verifyCode } = useMutation({
    mutationKey: ["postEmailVerify"],
    mutationFn: (code: string) => postEmailVerify(email, code),
    onSuccess: ({ accessToken }) => {
      onGuestRegistered(accessToken);

      toast.success("Успешный вход в систему");

      window.location.href = "/";
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    verifyCode(data.code);
  };

  return (
    <div className="flex flex-col gap-8 px-2 sm:px-16">
      <div className="flex flex-col gap-2 items-center">
        <Text as="h2" type="l">
          Зарегистрируйтесь в Jonu AI
        </Text>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Код подтверждения"
          fullWidth
          size="l"
          type="text"
          autoComplete="off"
          readOnly={isPending}
          {...register("code")}
          error={errors.code?.message}
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
      </form>

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
  );
};

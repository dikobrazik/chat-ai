import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify/unstyled";
import * as yup from "yup";
import { postEmailVerify, setAuthToken } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY } from "@/constants/auth";
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
  const router = useRouter();
  const { setIsGuest } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { email } = useEmailAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await postEmailVerify(email, data.code).then((accessToken) => {
      setAuthToken(accessToken);
      localStorage.removeItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY);
      setIsGuest(false);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      router.push("/");
      router.refresh();

      toast.success("Успешный вход в систему");
    });
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
          label="Код подтверждения"
          fullWidth
          size="l"
          type="text"
          autoComplete="off"
          {...register("code")}
          error={errors.code?.message}
        ></TextField>
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

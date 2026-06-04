import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify/unstyled";
import * as yup from "yup";
import { postEmailVerify, setAuthToken } from "@/api";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY } from "@/constants/auth";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
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
    // await postEmailVerify(email, data.code).then((accessToken) => {
    //   setAuthToken(accessToken);
    //   localStorage.removeItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY);
    //   setIsGuest(false);
    //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    //   router.push("/");
    //   router.refresh();
    //   toast.success("Успешный вход в систему");
    // });
  };

  return (
    <div className="flex flex-col gap-8 px-16">
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
          error={errors.email?.message}
        ></TextField>
        <Button variant="primary" size="m" align="center" type="submit">
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

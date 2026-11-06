import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { useAdminCodeForm } from "./useAdminCodeForm";

type Props = {
  email: string;
};

export const AdminCodeForm = ({ email }: Props) => {
  const {
    register,
    errors,
    submit,
    sendCode,
    isCodeSent,
    isCodeSending,
    isCodeConfirming,
  } = useAdminCodeForm();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[400px]">
      <div className="flex flex-col gap-2">
        <Text as="h2" type="l">
          Вход в админку
        </Text>
        <Text type="s" style="regular" color="#6F6F6F">
          {isCodeSent
            ? `Отправили код на ${email}`
            : `Для входа отправим одноразовый код на ${email}`}
        </Text>
      </div>

      {isCodeSent ? (
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <TextField
            label="Код из письма"
            fullWidth
            size="l"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            readOnly={isCodeConfirming}
            {...register("code")}
            error={errors.code?.message}
          />
          <Button
            variant="primary"
            size="m"
            align="center"
            type="submit"
            loading={isCodeConfirming}
          >
            Войти
          </Button>
          <Button
            type="button"
            align="center"
            onClick={sendCode}
            loading={isCodeSending}
          >
            <Text type="s" style="regular">
              Отправить код ещё раз
            </Text>
          </Button>
        </form>
      ) : (
        <Button
          variant="primary"
          size="m"
          align="center"
          onClick={sendCode}
          loading={isCodeSending}
        >
          Получить код
        </Button>
      )}
    </div>
  );
};

import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export const TooManyRequests = () => {
  const { isGuest } = useAuthContext();

  if (isGuest) {
    return (
      <Banner
        title="Вы достигли лимита использования без регистрации"
        description="Зарегистрируйтесь, чтобы увеличить свой лимит сообщений"
        direction="row"
        action={
          <Button variant="primary" href="/login" align="center">
            Зарегистрироваться
          </Button>
        }
      />
    );
  }

  return (
    <Banner
      title="Вы достигли лимита бесплатного плана"
      description="Перейдите на Плюс, чтобы продолжить без ограничений за 199 ₽ в месяц — всё включено"
      direction="row"
      action={
        <Button variant="primary" href="/plans" align="center">
          Перейти на Плюс
        </Button>
      }
    />
  );
};

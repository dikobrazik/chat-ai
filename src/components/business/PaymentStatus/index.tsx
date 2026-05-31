import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type Props = {
  status: "success" | "failure";
};

export const PaymentStatus = ({ status }: Props) => {
  if (status === "failure") {
    return (
      <div className="flex flex-col items-center gap-6">
        <Text>Оплата не прошла. Пожалуйста, попробуйте снова.</Text>

        <Button variant="primary" href="/plans">
          Выбрать план
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Text>Оплата прошла успешно!</Text>

      <Button variant="primary" href="/">
        На главную
      </Button>
    </div>
  );
};

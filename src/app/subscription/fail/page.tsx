import Button from "@/components/ui/Button";

export default function FailSubscriptionPage() {
  return (
    <div>
      <h1>Не удалось провести оплату</h1>

      <Button as="a" href="/plans">
        Попробовать еще раз
      </Button>
      <Button as="a" href="/chat">
        В чат
      </Button>
    </div>
  );
}

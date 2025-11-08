import Button from "@/components/ui/Button";

export default function SuccessSubscriptionPage() {
  return (
    <div>
      <h1>Спасибо за подписку!</h1>

      <Button as="a" size="xl" href="/chat">
        В чат!
      </Button>
    </div>
  );
}

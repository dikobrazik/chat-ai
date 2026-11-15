import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type RegisterReminderProps = {
  onClose?: () => void;
};

export const RegisterReminder = ({ onClose }: RegisterReminderProps) => (
  <Banner
    title="Хотите больше сообщений?"
    description="Зарегистрируйтесь бесплатно, чтобы увеличить свой лимит сообщений"
    direction="row"
    onClose={onClose}
    action={
      <Button variant="primary" href="/login" align="center">
        <Text type="s" as="div">
          Зарегистрироваться
        </Text>
      </Button>
    }
  />
);

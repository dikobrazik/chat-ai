import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type RegisterReminderProps = {
  onClose?: () => void;
};

export const RegisterReminder = ({ onClose }: RegisterReminderProps) => (
  <Banner
    title="Спасибо, что пользуетесь Jonu&nbsp;AI"
    description="Войдите в систему, чтобы использовать историю чатов, создавать изображения и загружать файлы."
    direction="row"
    onClose={onClose}
    action={
      <Button variant="primary" href="/login" align="center">
        <Text type="s" as="div">
          Войти
        </Text>
      </Button>
    }
  />
);

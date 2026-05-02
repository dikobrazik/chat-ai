import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

export const ChatSettings = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Text type="xs" color="#6F6F6F" style="regular">
          Архивированные чаты
        </Text>

        <Button variant="base" rightIcon={<Icon name="chevron-down" />}>
          Управление
        </Button>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <Text type="xs" color="#6F6F6F" style="regular">
          Архивировать все чаты
        </Text>

        <Button variant="base">Архивировать все</Button>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <Text type="xs" color="#6F6F6F" style="regular">
          Удалить все чаты
        </Text>

        <Button variant="danger" leftIcon={<Icon name="trash" />}>
          Удалить все
        </Button>
      </div>

      <Divider />
    </div>
  );
};

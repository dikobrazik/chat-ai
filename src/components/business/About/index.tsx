import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";

export const About = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Text type="xs" color="#6F6F6F" style="regular">
          Условия использования
        </Text>

        <Button variant="base">Посмотреть</Button>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <Text type="xs" color="#6F6F6F" style="regular">
          Политика конфиденциальности
        </Text>

        <Button variant="base">Посмотреть</Button>
      </div>
    </div>
  );
};

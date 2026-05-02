import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { PlanDescription } from "./components/PlanDescription";
import { SubscriptionBanner } from "./components/SubscriptionBanner";

export const ProfileSettings = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <div className="flex flex-col gap-6">
      <SubscriptionBanner />

      <PlanDescription />

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          Имя
        </Text>

        <div className="flex gap-2">
          <TextField readonly value={profile?.name ?? ""} />
          <Button variant="base" leftIcon={<Icon name="edit" />} />
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          E-mail
        </Text>

        <div className="flex gap-2">
          <TextField readonly value={profile?.email} />
          <Button variant="base" leftIcon={<Icon name="edit" />} />
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          Присылать обновления на почту
        </Text>

        <Switch />
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          Пароль
        </Text>

        <div className="flex gap-2">
          <TextField readonly />
          <Button variant="base" leftIcon={<Icon name="edit" />} />
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          Выйти из этого устройства
        </Text>

        <Button variant="base">Выйти</Button>
      </div>
    </div>
  );
};

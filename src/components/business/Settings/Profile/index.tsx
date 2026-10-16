import { toast } from "react-toastify/unstyled";
import { useProfile, useUpdateProfile } from "@/api";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { EditableField } from "./components/EditableField";

export const ProfileSettings = () => {
  const { data: profile } = useProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const updateMailingConsent = async (mailingConsent: boolean) => {
    try {
      await updateProfile({ mailing_consent: mailingConsent });
      toast.success("Изменения сохранены");
    } catch {
      toast.error("Не удалось сохранить изменения");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <EditableField
        label="Имя"
        value={profile?.name ?? ""}
        onSave={(name) => updateProfile({ name })}
      />

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          E-mail
        </Text>

        <div className="flex gap-2">
          <TextField readOnly value={profile?.email ?? ""} />
          <Button
            aria-label="Изменить E-mail"
            variant="base"
            leftIcon={<Icon name="edit" />}
          />
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          Присылать обновления на почту
        </Text>

        <Switch
          aria-label="Присылать обновления на почту"
          checked={profile?.mailing_consent ?? false}
          disabled={isPending}
          onChange={(event) => updateMailingConsent(event.target.checked)}
        />
      </div>

      <Divider />

      <div className="flex justify-between items-center">
        <Text color="#6F6F6F" type="xs">
          Пароль
        </Text>

        <div className="flex gap-2">
          <TextField readOnly />
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

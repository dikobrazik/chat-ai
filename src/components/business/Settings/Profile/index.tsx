import { toast } from "react-toastify/unstyled";
import { useProfile, useUpdateProfile } from "@/api";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Text";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import { EditableField } from "./components/EditableField";

export const ProfileSettings = () => {
  const { onLogoutClick } = useAuthContext();
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

      <div className="flex justify-between items-center gap-4">
        <Text color="#6F6F6F" type="xs" className="shrink-0">
          E-mail
        </Text>

        <Text type="s" style="regular" className="truncate">
          {profile?.email}
        </Text>
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
          Выйти из этого устройства
        </Text>

        <Button variant="base" onClick={onLogoutClick}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

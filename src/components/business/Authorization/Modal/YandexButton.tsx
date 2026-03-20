import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { BASE_URL } from "@/config";

export const YandexSignInButton = () => {
  return (
    <div>
      <Button
        as="a"
        variant="outline"
        fullWidth
        leftIcon={<Icon name="yandex" />}
        href={`${BASE_URL}/api/auth/ya`}
      >
        Yandex
      </Button>
    </div>
  );
};

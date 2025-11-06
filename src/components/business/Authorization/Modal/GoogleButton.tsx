import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { BASE_URL } from "@/config";

export const GoogleSignInButton = () => {
  return (
    <div>
      <Button
        as="a"
        variant="outline"
        size="sm"
        fullWidth
        leftIcon={<Icon name="google" />}
        href={`${BASE_URL}/api/auth/g`}
      >
        Google
      </Button>
    </div>
  );
};

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export const GoogleSignInButton = () => {
  return (
    <div>
      <Button
        as="a"
        variant="outline"
        size="sm"
        fullWidth
        leftIcon={<Icon name="google" />}
        href={`http://localhost/api/auth/g`}
      >
        Google
      </Button>
    </div>
  );
};

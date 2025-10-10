import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { AUTH_REDIRECT_URI } from "@/config";

export const GoogleSignInButton = () => {
  return (
    <div>
      <Button
        as="a"
        variant="outline"
        size="sm"
        fullWidth
        leftIcon={<Icon name="google" />}
        href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${AUTH_REDIRECT_URI}/g&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=123`}
      >
        Google
      </Button>
    </div>
  );
};

import { GoogleSignInButton } from "./GoogleButton";
import { YandexSignInButton } from "./YandexButton";

export const AuthorizationModal = () => {
  return (
    <div id="buttonContainerId">
      <YandexSignInButton />
      <GoogleSignInButton />
    </div>
  );
};

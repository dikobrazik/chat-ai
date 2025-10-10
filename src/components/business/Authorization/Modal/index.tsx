import { GoogleSignInButton } from "./GoogleButton";
import { YandexSignInButton } from "./YandexButton";
import styles from "./Modal.module.scss";

export const AuthorizationModal = () => {
  return (
    <div className={styles.content}>
      <YandexSignInButton />
      <GoogleSignInButton />
    </div>
  );
};

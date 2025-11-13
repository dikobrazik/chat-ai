import classNames from "classnames";
import styles from "./Message.module.scss";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  message: string;
  className?: string;
  role: string;
};

export const ERROR_MESSAGE_ID = "this-is-error-message";
export const WAITING_RESPONSE_MESSAGE_ID = "AI is typing...";
export const TOO_MANY_REQUESTS_MESSAGE_ID =
  "Too many requests. Please try again later.";

const Typing = () => {
  return (
    <span className={styles.typingIndicator}>
      &nbsp;
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </span>
  );
};

export const Message = ({ id, role, message, className }: Props) => {
  return (
    <div
      className={classNames(styles.message, className, styles[`${role}`], {
        [styles.error]: id === ERROR_MESSAGE_ID,
      })}
    >
      {id === WAITING_RESPONSE_MESSAGE_ID ? (
        <Typing />
      ) : id === TOO_MANY_REQUESTS_MESSAGE_ID ? (
        <span>
          Вы достигли лимита запросов. Зарегистрируйтесь, чтобы продолжить.
        </span>
      ) : (
        <Streamdown
          className={cn(
            "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
            styles.messageContent,
          )}
        >
          {message}
        </Streamdown>
      )}
    </div>
  );
};

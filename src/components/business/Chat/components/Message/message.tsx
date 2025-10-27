import styles from "./Message.module.scss";

type Props = {
  id: string;
  message: string;
  className?: string;
};

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

export const Message = ({ id, message, className }: Props) => {
  return (
    <div className={className}>
      {id === WAITING_RESPONSE_MESSAGE_ID ? (
        <Typing />
      ) : id === TOO_MANY_REQUESTS_MESSAGE_ID ? (
        <span>
          Вы достигли лимита запросов. Зарегистрируйтесь, чтобы продолжить.
        </span>
      ) : (
        message
      )}
    </div>
  );
};

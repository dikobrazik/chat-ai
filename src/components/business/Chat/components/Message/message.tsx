import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { Streamdown } from "streamdown";
import { getImageUrl } from "@/api";
import { cn } from "@/lib/utils";
import styles from "./Message.module.scss";

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

const ImageContent = ({
  chatId,
  promptId,
}: {
  chatId: string;
  promptId: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["image", chatId, promptId],
    queryFn: () => getImageUrl({ chatId, promptId }),
  });

  if (isLoading) {
    return <Typing />;
  }

  return <img src={data} alt="AI response" width="20%" />;
};

const MessageContent = ({ id, message }: { id: string; message: string }) => {
  const { id: chatId } = useParams();

  if (id === ERROR_MESSAGE_ID) {
    return <span>{message}</span>;
  } else if (id === TOO_MANY_REQUESTS_MESSAGE_ID) {
    return (
      <span>
        Вы достигли лимита запросов. Зарегистрируйтесь, чтобы продолжить.
      </span>
    );
  } else if (id === WAITING_RESPONSE_MESSAGE_ID) {
    return <Typing />;
  }

  if (message === "[Image response]") {
    return <ImageContent chatId={chatId as string} promptId={id} />;
  }

  return (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        styles.messageContent,
      )}
    >
      {message}
    </Streamdown>
  );
};

export const Message = ({ id, role, message, className }: Props) => {
  return (
    <div
      className={classNames(styles.message, className, styles[`${role}`], {
        [styles.error]: id === ERROR_MESSAGE_ID,
      })}
    >
      <MessageContent id={id} message={message} />
    </div>
  );
};

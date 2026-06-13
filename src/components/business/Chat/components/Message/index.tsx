import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { Streamdown } from "streamdown";
import { getImageUrl, type Prompt } from "@/api";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { FileComponent } from "@/components/ui/File";
import { cn } from "@/lib/utils";
import {
  ERROR_MESSAGE_ID,
  SYSTEM_MESSAGES,
  TOO_MANY_REQUESTS_MESSAGE_ID,
  WAITING_RESPONSE_MESSAGE_ID,
} from "./constants";
import styles from "./Message.module.scss";
import { MessageActions } from "./MessageActions";
import { ModelTyping } from "./ModelTyping";
import { TooManyRequests } from "./TooManyRequests";

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
    return <ModelTyping />;
  }

  // biome-ignore lint/performance/noImgElement: <explanation>
  return <img src={data} alt="AI response" width="20%" />;
};

const MessageContent = ({ id, message }: { id: string; message: string }) => {
  const { id: chatId } = useParams();

  if (id === ERROR_MESSAGE_ID) {
    return <span>{message}</span>;
  } else if (id === TOO_MANY_REQUESTS_MESSAGE_ID) {
    return <TooManyRequests />;
  } else if (id === WAITING_RESPONSE_MESSAGE_ID) {
    return <ModelTyping />;
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

export const Message = ({ id, role, files, text: message }: Prompt) => {
  return (
    <>
      {!SYSTEM_MESSAGES.includes(id) && (
        <MessageActions text={message} role={role} />
      )}
      <div
        className={classNames(styles.message, styles[`${role}`], {
          [styles.error]: id === ERROR_MESSAGE_ID,
          [styles.banner]: id === TOO_MANY_REQUESTS_MESSAGE_ID,
        })}
      >
        <MessageContent id={id} message={message} />
      </div>
      {files?.map((file) => (
        <div
          key={file.id}
          className={classNames(
            styles.message,
            styles[`${role}`],
            styles.attachment,
          )}
        >
          <div className={styles.file}>
            <FileComponent
              isUploaded
              name={file.name}
              type={file.type}
              size={file.size}
            />
          </div>
        </div>
      ))}
    </>
  );
};

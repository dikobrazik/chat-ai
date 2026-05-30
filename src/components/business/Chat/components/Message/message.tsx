import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { Streamdown } from "streamdown";
import { getImageUrl, type Prompt } from "@/api";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { FileComponent } from "@/components/ui/File";
import Icon from "@/components/ui/Icon";
import { useCopy } from "@/hooks/useCopy";
import { cn } from "@/lib/utils";
import styles from "./Message.module.scss";

type Props = {
  id: string;
  message: string;
  files: Prompt["files"];
  className?: string;
  role: string;
};

export const ERROR_MESSAGE_ID = "this-is-error-message";
export const WAITING_RESPONSE_MESSAGE_ID = "AI is typing...";
export const TOO_MANY_REQUESTS_MESSAGE_ID =
  "Too many requests. Please try again later.";

const SYSTEM_MESSAGES = [
  ERROR_MESSAGE_ID,
  WAITING_RESPONSE_MESSAGE_ID,
  TOO_MANY_REQUESTS_MESSAGE_ID,
];

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
      <Banner
        title="Вы достигли лимита бесплатного плана"
        description="Перейдите на Плюс, чтобы продолжить без ограничений за 490 ₽ в месяц — всё включено"
        action={
          <Button variant="primary" href="/plans" align="center">
            Перейти на Плюс
          </Button>
        }
      />
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

export const Message = ({ id, role, files, message, className }: Props) => {
  const copyToClipboard = useCopy();

  return (
    <>
      {!SYSTEM_MESSAGES.includes(id) && (
        <div className={styles[role]}>
          <Button
            size="x"
            leftIcon={<Icon name="copy" size="16" />}
            onClick={() => copyToClipboard(message)}
          />
          {role === "model" && (
            <>
              <Button
                size="x"
                leftIcon={<Icon name="refresh" size="16" />}
                onClick={() => copyToClipboard(message)}
              />
              <Button
                size="x"
                leftIcon={<Icon name="like" size="16" />}
                onClick={() => copyToClipboard(message)}
              />
              <Button
                size="x"
                leftIcon={<Icon name="dislike" size="16" />}
                onClick={() => copyToClipboard(message)}
              />
              <Button
                size="x"
                leftIcon={<Icon name="export" size="16" />}
                onClick={() => copyToClipboard(message)}
              />
            </>
          )}
        </div>
      )}
      <div
        className={classNames(styles.message, className, styles[`${role}`], {
          [styles.error]: id === ERROR_MESSAGE_ID,
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

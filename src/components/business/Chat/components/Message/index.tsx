import classNames from "classnames";
import { useParams } from "next/navigation";
import { Streamdown } from "streamdown";
import type { Prompt } from "@/api";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import {
  ANIMATION,
  CONTROLS,
  ERROR_MESSAGE_ID,
  LINK_SAFETY,
  MARKDOWN_COMPONENTS,
  PLUGINS_BY_ROLE,
  REHYPE_PLUGINS,
  REMARK_PLUGINS_BY_ROLE,
  THINKING_MESSAGE_ID,
  TOO_MANY_REQUESTS_MESSAGE_ID,
  TRANSLATIONS,
  WAITING_RESPONSE_MESSAGE_ID,
} from "./constants";
import { useMessageMarkdown } from "./hooks/useMessageMarkdown";
import { useMessageState } from "./hooks/useMessageState";
import { useRemarkRehypeOptions } from "./hooks/useRemarkRehypeOptions";
import styles from "./Message.module.scss";
import { MessageActions } from "./MessageActions";
import { ModelTyping } from "./ModelTyping";
import { TooManyRequests } from "./TooManyRequests";
import "streamdown/styles.css";
import "katex/dist/katex.min.css";
import "katex/contrib/mhchem";
import { ImageContent } from "./ImageContent";
import { MessageFiles } from "./MessageFiles";

const MessageContent = ({
  id,
  role,
  message,
  isStreaming,
  isEmpty,
}: {
  id: string;
  role: Prompt["role"];
  message: string;
  isStreaming: boolean;
  isEmpty: boolean;
}) => {
  const { id: chatId } = useParams();
  const remarkRehypeOptions = useRemarkRehypeOptions(id);
  const { markdown, splitIntoBlocks } = useMessageMarkdown(
    message,
    isStreaming,
  );

  if (id.startsWith(ERROR_MESSAGE_ID)) {
    return <span>{message}</span>;
  } else if (id === TOO_MANY_REQUESTS_MESSAGE_ID) {
    return <TooManyRequests />;
  } else if (id === WAITING_RESPONSE_MESSAGE_ID || id === THINKING_MESSAGE_ID) {
    return <ModelTyping isThinking={id === THINKING_MESSAGE_ID} />;
  }

  if (isEmpty) {
    return isStreaming ? (
      <ModelTyping />
    ) : (
      <Text style="regular" className={styles.notice}>
        Модель не прислала ответ. Попробуйте отправить вопрос ещё раз.
      </Text>
    );
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
      parseIncompleteMarkdown={false}
      animated={ANIMATION}
      isAnimating={isStreaming}
      plugins={PLUGINS_BY_ROLE[role]}
      remarkPlugins={REMARK_PLUGINS_BY_ROLE[role]}
      rehypePlugins={REHYPE_PLUGINS}
      remarkRehypeOptions={remarkRehypeOptions}
      controls={CONTROLS}
      linkSafety={LINK_SAFETY}
      tableMaxHeight={0}
      codeBlockMaxHeight={0}
      lineNumbers={false}
      components={MARKDOWN_COMPONENTS}
      translations={TRANSLATIONS}
      parseMarkdownIntoBlocksFn={splitIntoBlocks}
    >
      {markdown}
    </Streamdown>
  );
};

export const Message = ({
  id,
  role,
  files,
  text: message,
  isStreaming,
}: Prompt) => {
  const { isError, isEmpty, hasActions } = useMessageState({
    id,
    role,
    text: message,
  });

  return (
    <>
      {hasActions && <MessageActions id={id} text={message} role={role} />}
      <div
        id={`prompt-${id}`}
        className={classNames(styles.message, styles[`${role}`], {
          [styles.error]: isError,
          [styles.banner]: id === TOO_MANY_REQUESTS_MESSAGE_ID,
        })}
      >
        <MessageContent
          id={id}
          role={role}
          message={message}
          isStreaming={Boolean(isStreaming)}
          isEmpty={isEmpty}
        />
      </div>
      <MessageFiles files={files} role={role} />
    </>
  );
};

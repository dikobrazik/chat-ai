import { code } from "@streamdown/code";
import { math } from "@streamdown/math";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { Streamdown } from "streamdown";
import type { Prompt } from "@/api";
import { cn } from "@/lib/utils";
import {
  CONTROLS,
  ERROR_MESSAGE_ID,
  LINK_SAFETY,
  MARKDOWN_COMPONENTS,
  REHYPE_PLUGINS,
  REMARK_PLUGINS_BY_ROLE,
  REMEND_OPTIONS,
  SYSTEM_MESSAGES,
  TOO_MANY_REQUESTS_MESSAGE_ID,
  TRANSLATIONS,
  WAITING_RESPONSE_MESSAGE_ID,
} from "./constants";
import styles from "./Message.module.scss";
import { MessageActions } from "./MessageActions";
import { ModelTyping } from "./ModelTyping";
import { prepareMarkdown, splitMarkdownIntoBlocks } from "./markdown";
import { TooManyRequests } from "./TooManyRequests";
import "streamdown/styles.css";
import "katex/dist/katex.min.css";
import { ImageContent } from "./ImageContent";
import { MessageFiles } from "./MessageFiles";

const MessageContent = ({
  id,
  role,
  message,
  isStreaming,
}: {
  id: string;
  role: Prompt["role"];
  message: string;
  isStreaming: boolean;
}) => {
  const { id: chatId } = useParams();

  if (id.startsWith(ERROR_MESSAGE_ID)) {
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
      parseIncompleteMarkdown={isStreaming}
      animated={{ animation: "fadeIn", duration: 250, easing: "ease-out" }}
      isAnimating={isStreaming}
      plugins={{ math, code }}
      remarkPlugins={REMARK_PLUGINS_BY_ROLE[role]}
      rehypePlugins={REHYPE_PLUGINS}
      remend={REMEND_OPTIONS}
      controls={CONTROLS}
      linkSafety={LINK_SAFETY}
      tableMaxHeight={0}
      codeBlockMaxHeight={0}
      lineNumbers={false}
      components={MARKDOWN_COMPONENTS}
      translations={TRANSLATIONS}
      parseMarkdownIntoBlocksFn={
        isStreaming ? undefined : splitMarkdownIntoBlocks
      }
    >
      {prepareMarkdown(message, isStreaming)}
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
  return (
    <>
      {!(SYSTEM_MESSAGES.includes(id) || id.startsWith(ERROR_MESSAGE_ID)) && (
        <MessageActions id={id} text={message} role={role} />
      )}
      <div
        id={`prompt-${id}`}
        className={classNames(styles.message, styles[`${role}`], {
          [styles.error]: id.startsWith(ERROR_MESSAGE_ID),
          [styles.banner]: id === TOO_MANY_REQUESTS_MESSAGE_ID,
        })}
      >
        <MessageContent
          id={id}
          role={role}
          message={message}
          isStreaming={Boolean(isStreaming)}
        />
      </div>
      <MessageFiles files={files} role={role} />
    </>
  );
};

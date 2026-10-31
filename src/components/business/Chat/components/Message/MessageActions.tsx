import type { Prompt } from "@/api";
import { useCopyMessage } from "./hooks/useCopyMessage";
import { useReaction } from "./hooks/useReaction";
import { useSharePrompt } from "./hooks/useSharePrompt";
import styles from "./Message.module.scss";
import { MessageActionButton } from "./MessageActionButton";
import { MessageSources } from "./MessageSources";
import type { MessageSourcesData } from "./MessageSources/utils";

export const MessageActions = ({
  id,
  text,
  role,
  sources,
  isStreaming,
}: Pick<Prompt, "id" | "text" | "role" | "isStreaming"> & {
  sources: MessageSourcesData;
}) => {
  const { isCopied, onCopyClick } = useCopyMessage(text);
  const { reaction, onLikeClick, onDislikeClick } = useReaction();
  const { isShared, isSharing, onShareClick } = useSharePrompt(id);

  return (
    <div className={styles[`${role}Actions`]}>
      <MessageActionButton
        icon="copy"
        activeIcon="check"
        isActive={isCopied}
        pressed={isCopied}
        onClick={onCopyClick}
      />
      {role === "model" && (
        <>
          <MessageActionButton
            icon="like"
            activeIcon="like-fill"
            isActive={reaction === "like"}
            onClick={onLikeClick}
          />
          <MessageActionButton
            icon="dislike"
            activeIcon="dislike-fill"
            isActive={reaction === "dislike"}
            onClick={onDislikeClick}
          />
          <MessageActionButton
            icon="export"
            isActive={isShared}
            pressed={isShared}
            loading={isSharing}
            onClick={onShareClick}
          />
          {!isStreaming && <MessageSources {...sources} />}
        </>
      )}
    </div>
  );
};

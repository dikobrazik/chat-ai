import type { Prompt } from "@/api";
import { useCopyMessage } from "./hooks/useCopyMessage";
import { useReaction } from "./hooks/useReaction";
import { useSharePrompt } from "./hooks/useSharePrompt";
import styles from "./Message.module.scss";
import { MessageActionButton } from "./MessageActionButton";

export const MessageActions = ({
  id,
  text,
  role,
  isStreaming,
  isPublicPage,
}: Pick<Prompt, "id" | "text" | "role" | "isStreaming"> & {
  isPublicPage: boolean;
}) => {
  const { isCopied, onCopyClick } = useCopyMessage(text);
  const { reaction, onLikeClick, onDislikeClick } = useReaction();
  const { isShared, isSharing, onShareClick } = useSharePrompt(
    id,
    isPublicPage,
  );

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
          {!isPublicPage && (
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
            </>
          )}
          {!isStreaming && (
            <MessageActionButton
              icon="export"
              isActive={isShared}
              pressed={isShared}
              loading={isSharing}
              onClick={onShareClick}
            />
          )}
        </>
      )}
    </div>
  );
};

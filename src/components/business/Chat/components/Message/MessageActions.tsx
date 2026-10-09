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
}: Pick<Prompt, "id" | "text" | "role">) => {
  const { isCopied, onCopyClick } = useCopyMessage(text);
  const { reaction, onLikeClick, onDislikeClick } = useReaction();
  const { isShared, isSharing, onShareClick } = useSharePrompt(id);

  return (
    <div className={styles[role]}>
      <MessageActionButton
        icon={isCopied ? "check" : "copy"}
        isActive={isCopied}
        pressed={isCopied}
        onClick={onCopyClick}
      />
      {role === "model" && (
        <>
          {reaction !== "dislike" && (
            <MessageActionButton
              icon={reaction === "like" ? "like-fill" : "like"}
              isActive={reaction === "like"}
              onClick={onLikeClick}
            />
          )}
          {reaction !== "like" && (
            <MessageActionButton
              icon={reaction === "dislike" ? "dislike-fill" : "dislike"}
              isActive={reaction === "dislike"}
              onClick={onDislikeClick}
            />
          )}
          <MessageActionButton
            icon="export"
            isActive={isShared}
            pressed={isShared}
            loading={isSharing}
            onClick={onShareClick}
          />
        </>
      )}
    </div>
  );
};

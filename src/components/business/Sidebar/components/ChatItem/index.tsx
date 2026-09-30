import { usePathname } from "next/navigation";
import { type Chat, usePinChat } from "@/api";
import { ChatActions } from "@/components/business/ChatActions";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { preventDefault, stopPropagation } from "@/utils";
import styles from "./ChatItem.module.scss";

type Props = {
  chat: Chat;
  onClick: () => void;
};

export const ChatItem = ({ chat, onClick }: Props) => {
  const pathname = usePathname();
  const { pinChat } = usePinChat(chat.id);

  const onUnpinClick = preventDefault(stopPropagation(() => pinChat(false)));

  return (
    <Button
      href={`/chat/${chat.id}`}
      onClick={onClick}
      className={cn(styles.chatItem, "shrink-0", {
        [styles.active]: pathname === `/chat/${chat.id}`,
        [styles.pinned]: chat.is_pinned,
      })}
      title={chat.title || ""}
    >
      <Text className={styles.title} style="regular">
        {chat.title}
      </Text>

      <div className={cn(styles.actions, "flex items-center")}>
        {chat.is_pinned && (
          <Button
            className={styles.action}
            aria-label="Открепить чат"
            onClick={onUnpinClick}
            leftIcon={<Icon name="pinned-off" />}
          />
        )}

        <Popover
          Trigger={(props) => (
            <Button
              {...props}
              className={cn(props.className, styles.action)}
              onClick={
                props.onClick
                  ? preventDefault(stopPropagation(props.onClick))
                  : props.onClick
              }
              leftIcon={<Icon name="more" />}
            />
          )}
          position={["right", "bottom"]}
          align="start"
        >
          <ChatActions chatId={chat.id} />
        </Popover>
      </div>
    </Button>
  );
};

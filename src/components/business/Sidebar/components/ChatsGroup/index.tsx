import type { Chat } from "@/api";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { ChatItem } from "../ChatItem";
import styles from "./ChatsGroup.module.scss";

type Props = {
  title: string;
  chats: Chat[];
  isLoading?: boolean;
  onChatClick: () => void;
};

export const ChatsGroup = ({ title, chats, isLoading, onChatClick }: Props) => {
  const { active: isOpen, toggle } = useToggle(true);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={toggle}
        className={cn(styles.header, "flex items-center gap-1 self-start", {
          [styles.open]: isOpen,
        })}
      >
        <Text style="regular">{title}</Text>
        <Icon name="chevron-down" className={styles.chevron} />
      </button>
      <div className={cn(styles.collapse, { [styles.open]: isOpen })}>
        <div className="flex flex-col">
          {chats.map((chat) => (
            <Skeleton
              key={chat.id}
              isLoading={isLoading}
              className="mb-2"
              height={40}
            >
              <ChatItem chat={chat} onClick={onChatClick} />
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};

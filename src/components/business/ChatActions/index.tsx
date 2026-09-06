import { useChat } from "@/api";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { preventDefault } from "@/utils";
import { useDelete } from "./hooks/useDelete";
import { usePin } from "./hooks/usePin";
import { useShare } from "./hooks/useShare";

type Actions = "share" | "pin" | "rename" | "move" | "archive" | "delete";

type Props = {
  hiddenActions?: Actions[];
  chatId: string;
};

export const ChatActions = ({ chatId, hiddenActions }: Props) => {
  const { chat } = useChat(chatId);

  const onShareClick = useShare(chatId);
  const onPinClick = usePin(chatId);
  const onDeleteClick = useDelete(chatId);

  return (
    <div className="flex flex-col gap-1">
      {!hiddenActions?.includes("share") && (
        <Button
          leftIcon={<Icon name="export" />}
          onClick={preventDefault(onShareClick)}
        >
          Поделиться
        </Button>
      )}
      <Button
        leftIcon={<Icon name={chat?.is_pinned ? "pinned-off" : "pin"} />}
        onClick={preventDefault(onPinClick)}
      >
        {chat?.is_pinned ? "Открепить" : "Закрепить"}
      </Button>
      <Button
        leftIcon={<Icon name="edit-square" />}
        href={`/chat/${chatId}/rename`}
      >
        Переименовать
      </Button>
      <Button
        disabled
        rightIcon={
          <Badge variant="secondary" size="s">
            <Text type="xs" style="regular">
              Скоро
            </Text>
          </Badge>
        }
        leftIcon={<Icon name="add-square" />}
        onClick={preventDefault(() => {})}
      >
        Перенести в проект
      </Button>

      <Divider />
      <Button
        disabled
        rightIcon={
          <Badge variant="secondary" size="s">
            <Text type="xs" style="regular">
              Скоро
            </Text>
          </Badge>
        }
        leftIcon={<Icon name="archive" />}
        onClick={preventDefault(() => {})}
      >
        Архивировать
      </Button>
      <Button
        variant="danger"
        leftIcon={<Icon name="trash" />}
        onClick={preventDefault(onDeleteClick)}
      >
        Удалить
      </Button>
    </div>
  );
};

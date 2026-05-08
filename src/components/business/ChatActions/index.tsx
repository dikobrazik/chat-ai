import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { preventDefault } from "@/utils";
import { useDelete } from "./hooks/useDelete";
import { useShare } from "./hooks/useShare";

type Actions = "share" | "pin" | "rename" | "move" | "archive" | "delete";

type Props = {
  hiddenActions?: Actions[];
  chatId: string;
};

export const ChatActions = ({ chatId, hiddenActions }: Props) => {
  const onShareClick = useShare();
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
        disabled
        rightIcon={
          <Badge variant="secondary" size="s">
            <Text type="xs" style="regular">
              Скоро
            </Text>
          </Badge>
        }
        leftIcon={<Icon name="pin" />}
        onClick={preventDefault(() => {})}
      >
        Закрепить
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
        leftIcon={<Icon name="edit-square" />}
        onClick={preventDefault(() => {})}
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
        // rightIcon={<Icon name="arrow-right" />}
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

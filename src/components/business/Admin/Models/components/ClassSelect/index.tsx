import type { ModelClass } from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { ModelClassName } from "../ModelClassName";

type Props = {
  value: ModelClass | null;
  isPending: boolean;
  onChange: (value: ModelClass) => void;
};

export const ClassSelect = ({ value, isPending, onChange }: Props) => (
  <Popover
    position="bottom"
    align="end"
    Trigger={(props) => (
      <Button
        variant={value ? undefined : "base"}
        loading={isPending}
        rightIcon={<Icon name="chevron-down" size={16} />}
        {...props}
      >
        <Text
          type="s"
          style="regular"
          color={value ? undefined : "#0F8AFF"}
          className="whitespace-nowrap"
        >
          {value ? <ModelClassName modelClass={value} /> : "Выбрать"}
        </Text>
      </Button>
    )}
  >
    {(close) => {
      const select = (modelClass: ModelClass) => {
        onChange(modelClass);
        close();
      };

      return (
        <div className="flex flex-col gap-1 w-[260px]">
          <Text
            type="xs"
            style="regular"
            color="#9C9C9C"
            className="px-3 py-1 whitespace-normal"
          >
            Класс выбирается по цене одного сообщения: 1&nbsp;200 токенов на
            вход и 400 на выход
          </Text>
          <Button pressed={value === "fast"} onClick={() => select("fast")}>
            <div className="flex flex-col items-start">
              <Text type="s" style="regular">
                Быстрая
              </Text>
              <Text type="xs" style="regular" color="#9C9C9C">
                до $0,0015 за сообщение
              </Text>
            </div>
          </Button>
          <Button
            pressed={value === "advanced"}
            onClick={() => select("advanced")}
          >
            <div className="flex flex-col items-start">
              <Text type="s" style="regular">
                Продвинутая
              </Text>
              <Text type="xs" style="regular" color="#9C9C9C">
                от $0,0015 до $0,03 за сообщение
              </Text>
            </div>
          </Button>
          <Button pressed={value === "heavy"} onClick={() => select("heavy")}>
            <div className="flex flex-col items-start">
              <Text type="s" style="regular">
                Тяжёлая
              </Text>
              <Text type="xs" style="regular" color="#9C9C9C">
                дороже $0,03 за сообщение
              </Text>
            </div>
          </Button>
        </div>
      );
    }}
  </Popover>
);

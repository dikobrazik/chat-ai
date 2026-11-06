import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";

type Option<T extends string> = {
  value: T;
  label: ReactNode;
};

type Props<T extends string> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export const FilterSelect = <T extends string>({
  value,
  options,
  onChange,
}: Props<T>) => (
  <Popover
    position="bottom"
    align="start"
    Trigger={(props) => (
      <Button
        variant="base"
        rightIcon={<Icon name="chevron-down" size={16} />}
        {...props}
      >
        <Text type="s" style="regular">
          {options.find((option) => option.value === value)?.label}
        </Text>
      </Button>
    )}
  >
    {(close) => (
      <div className="flex flex-col gap-1">
        {options.map((option) => (
          <Button
            key={option.value}
            pressed={option.value === value}
            onClick={() => {
              onChange(option.value);
              close();
            }}
          >
            <Text type="s" style="regular">
              {option.label}
            </Text>
          </Button>
        ))}
      </div>
    )}
  </Popover>
);

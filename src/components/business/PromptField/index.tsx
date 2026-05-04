import { forwardRef } from "react";
import { ModelSelect } from "@/components/business/ModelSelect";
import Popover from "@/components/ui/Popover";
import Button from "../../ui/Button";
import Icon from "../../ui/Icon";
import styles from "./PromptField.module.scss";

type PromptFieldProps = {
  value: string;
  placeholder?: string;
  isPromptSending: boolean;
  isChatCreating: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendClick: () => void;
};

export const PromptField = forwardRef<HTMLTextAreaElement, PromptFieldProps>(
  (
    {
      value,
      isPromptSending,
      isChatCreating,
      onKeyDown,
      onInputChange,
      onSendClick,
      placeholder,
    },
    ref,
  ) => {
    return (
      <div className={styles.controlsContainer}>
        <textarea
          id="prompt"
          name="prompt"
          placeholder={placeholder}
          ref={ref}
          className={styles.textfield}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
        />

        <div className={styles.controls}>
          <div className="flex gap-1">
            <Popover
              position="top"
              align="start"
              Trigger={(props) => (
                <Button
                  {...props}
                  leftIcon={<Icon name="plus" color="black" />}
                />
              )}
            >
              <div className="flex flex-col gap-1">
                <Button leftIcon={<Icon name="paperclip" />}>
                  Добавить фото или файл
                </Button>
                <Button
                  href="/image-chat"
                  leftIcon={<Icon name="gallery-edit" />}
                >
                  Создать изображение
                </Button>
              </div>
            </Popover>
            <ModelSelect />
          </div>
          <div></div>
          <Button
            variant="primary"
            className={styles.button}
            leftIcon={<Icon name="arrow-up" color="white" />}
            disabled={!value}
            loading={isPromptSending || isChatCreating}
            onClick={onSendClick}
          />
        </div>
      </div>
    );
  },
);

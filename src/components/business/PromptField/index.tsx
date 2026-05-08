import { forwardRef, useRef } from "react";
import { ModelSelect } from "@/components/business/ModelSelect";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import Button from "../../ui/Button";
import Icon from "../../ui/Icon";
import { useFiles } from "./hooks/useAddFiles";
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
    const addFilesRef = useRef<HTMLInputElement>(null);
    const { files, onAddFiles, removeFile } = useFiles();

    return (
      <div
        className={cn(styles.controlsContainer, {
          [styles.withFiles]: Boolean(files?.length),
        })}
      >
        <input
          hidden
          type="file"
          id="fileInput"
          onChange={onAddFiles}
          multiple
          ref={addFilesRef}
        ></input>

        <div>
          {(files ?? []).map((file) => (
            <Button
              key={file.name}
              rightIcon={
                <div onClick={() => removeFile(file.name)}>
                  <Icon name="close" />
                </div>
              }
              variant="secondary"
            >
              <Icon name="paperclip" />
              <div className="flex flex-col items-start gap-1">
                <Text type="xs" style="regular">
                  {file.name}
                </Text>
                <Text type="xs" style="regular" color="#9C9C9C">
                  {file.type}&nbsp;•&nbsp;{(file.size / 1024).toFixed(2)} КБ
                </Text>
              </div>
            </Button>
          ))}
        </div>

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
                <Button
                  leftIcon={<Icon name="paperclip" />}
                  onClick={() => addFilesRef.current?.click()}
                >
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

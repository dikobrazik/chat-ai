import { forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { ModelSelect } from "@/components/business/ModelSelect";
import Popover from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { useFiles } from "@/providers/FilesProvider/useFiles";
import Button from "../../ui/Button";
import Icon from "../../ui/Icon";
import { File } from "./components/File";
import styles from "./PromptField.module.scss";

type PromptFieldProps = {
  value: string;
  placeholder?: string;
  isPromptSending: boolean;
  isChatCreating: boolean;
  onInputChange: (value: string) => void;
  onSendClick: () => void;
};

export const PromptField = forwardRef<HTMLTextAreaElement, PromptFieldProps>(
  (
    {
      value,
      isPromptSending,
      isChatCreating,
      onInputChange,
      onSendClick,
      placeholder,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const addFilesRef = useRef<HTMLInputElement>(null);
    const { attachments, areAllFilesUploaded, addFiles } = useFiles();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onInputChange(e.target.value);

      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!value || !areAllFilesUploaded) return;

      if (
        event?.key === "Enter" &&
        (!event?.shiftKey || !event?.altKey || !event?.ctrlKey)
      ) {
        event.preventDefault();
        onSendClick();
      }
    };

    return (
      <div
        className={cn(styles.controlsContainer, {
          [styles.withFiles]: Boolean(attachments?.length),
        })}
      >
        <input
          hidden
          type="file"
          id="fileInput"
          accept="image/*,application/pdf,.doc,.docx,.txt,.md"
          onChange={(e) => {
            addFiles(e.target.files);

            inputRef.current?.focus();
          }}
          multiple
          ref={addFilesRef}
        ></input>

        <div>
          {(attachments ?? []).map((file) => (
            <File key={file.name} fileId={file.id} />
          ))}
        </div>

        <textarea
          id="prompt"
          name="prompt"
          placeholder={placeholder}
          ref={mergeRefs([inputRef, ref])}
          className={styles.textfield}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
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
            disabled={!value || !areAllFilesUploaded}
            loading={isPromptSending || isChatCreating}
            onClick={onSendClick}
          />
        </div>
      </div>
    );
  },
);

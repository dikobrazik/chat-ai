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
import { useAccept } from "./useAccept";

type PromptFieldProps = {
  value: string;
  placeholder?: string;
  isPromptSending: boolean;
  isChatCreating: boolean;
  // в разделе изображений вместо меню «+» — сразу скрепка с выбором файла
  attachOnly?: boolean;
  attachInputRef?: React.RefObject<HTMLInputElement | null>;
  onInputChange: (value: string) => void;
  onSendClick: () => void;
};

export const PromptField = forwardRef<HTMLTextAreaElement, PromptFieldProps>(
  (
    {
      value,
      isPromptSending,
      isChatCreating,
      attachOnly,
      attachInputRef,
      onInputChange,
      onSendClick,
      placeholder,
    },
    ref,
  ) => {
    const accept = useAccept();

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
          accept={accept}
          onChange={(e) => {
            addFiles(e.target.files);

            inputRef.current?.focus();
          }}
          multiple
          ref={
            attachInputRef
              ? mergeRefs([addFilesRef, attachInputRef])
              : addFilesRef
          }
        ></input>

        <div
          className={cn(
            styles.filesContainer,
            "flex w-full overflow-scroll gap-2",
          )}
        >
          {(attachments ?? []).map((file) => (
            <File key={file.name} fileId={file.id} />
          ))}
        </div>

        <textarea
          id="prompt"
          name="prompt"
          // biome-ignore lint/a11y/noAutofocus: ввод с клавиатуры сразу после загрузки страницы
          autoFocus
          placeholder={placeholder}
          ref={mergeRefs([inputRef, ref])}
          className={styles.textfield}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />

        <div className={styles.controls}>
          <div className="flex gap-1">
            {attachOnly ? (
              Boolean(accept) && (
                <Button
                  className={styles.plusButton}
                  leftIcon={<Icon name="paperclip" />}
                  onClick={() => addFilesRef.current?.click()}
                />
              )
            ) : (
              <Popover
                position="top"
                align="start"
                Trigger={(props) => (
                  <Button
                    {...props}
                    className={styles.plusButton}
                    leftIcon={<Icon name="plus" color="black" size={22} />}
                  />
                )}
              >
                <div className="flex flex-col gap-1">
                  {Boolean(accept) && (
                    <Button
                      leftIcon={<Icon name="paperclip" />}
                      onClick={() => addFilesRef.current?.click()}
                    >
                      Добавить фото или файл
                    </Button>
                  )}
                  <Button
                    href="/image-chat"
                    leftIcon={<Icon name="gallery-edit" />}
                  >
                    Создать изображение
                  </Button>
                </div>
              </Popover>
            )}
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

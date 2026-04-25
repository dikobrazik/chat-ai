import { ModelSelect } from "@/components/business/ModelSelect";
import Button from "../../ui/Button";
import Icon from "../../ui/Icon";
import styles from "./PromptField.module.scss";

type PromptFieldProps = {
  value: string;
  isPromptSending: boolean;
  isChatCreating: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendClick: () => void;
};

export const PromptField = ({
  value,
  isPromptSending,
  isChatCreating,
  onKeyDown,
  onInputChange,
  onSendClick,
}: PromptFieldProps) => {
  return (
    <div className={styles.controlsContainer}>
      <textarea
        id="prompt"
        name="prompt"
        className={styles.textfield}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />

      <div className={styles.controls}>
        <div className="flex gap-1">
          <Button leftIcon={<Icon name="plus" color="black" />} />
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
};

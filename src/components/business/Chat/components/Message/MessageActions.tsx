import type { Prompt } from "@/api";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useCopy } from "@/hooks/useCopy";
import styles from "./Message.module.scss";

export const MessageActions = ({
  text,
  role,
}: Pick<Prompt, "text" | "role">) => {
  const copyToClipboard = useCopy();

  return (
    <div className={styles[role]}>
      <Button
        size="x"
        leftIcon={<Icon name="copy" size="16" />}
        onClick={() => copyToClipboard(text)}
      />
      {role === "model" && (
        <>
          <Button
            size="x"
            leftIcon={<Icon name="refresh" size="16" />}
            onClick={() => copyToClipboard(text)}
          />
          <Button
            size="x"
            leftIcon={<Icon name="like" size="16" />}
            onClick={() => copyToClipboard(text)}
          />
          <Button
            size="x"
            leftIcon={<Icon name="dislike" size="16" />}
            onClick={() => copyToClipboard(text)}
          />
          <Button
            size="x"
            leftIcon={<Icon name="export" size="16" />}
            onClick={() => copyToClipboard(text)}
          />
        </>
      )}
    </div>
  );
};

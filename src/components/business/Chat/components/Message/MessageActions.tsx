import { useParams } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import type { Prompt } from "@/api";
import { useMakePromptPublic } from "@/api";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useCopy } from "@/hooks/useCopy";
import styles from "./Message.module.scss";

export const MessageActions = ({
  id,
  text,
  role,
}: Pick<Prompt, "id" | "text" | "role">) => {
  const { id: chatId } = useParams();

  const copyToClipboard = useCopy();

  const { makePromptPublic, isPending: isMakingPromptPublic } =
    useMakePromptPublic(chatId as string, id);

  const onShareClick = () => {
    makePromptPublic(undefined, {
      onSuccess: () => {
        copyToClipboard(`${window.location.origin}/p/${id}`);
        toast.success("Ссылка на промпт скопирована в буфер обмена");
      },
    });
  };

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
            loading={isMakingPromptPublic}
            leftIcon={<Icon name="export" size="16" />}
            onClick={onShareClick}
          />
        </>
      )}
    </div>
  );
};

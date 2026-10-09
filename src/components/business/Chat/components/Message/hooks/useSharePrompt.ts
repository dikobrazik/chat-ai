import { useParams } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import { useMakePromptPublic } from "@/api";
import { useCopy } from "@/hooks/useCopy";
import { useTemporaryFlag } from "@/hooks/useTemporaryFlag";
import { ACTION_FEEDBACK_DURATION } from "../constants";

export const useSharePrompt = (promptId: string) => {
  const { id: chatId } = useParams();

  const copyToClipboard = useCopy();
  const { active: isShared, toggleOn } = useTemporaryFlag(
    ACTION_FEEDBACK_DURATION,
  );

  const { makePromptPublic, isPending: isSharing } = useMakePromptPublic(
    chatId as string,
    promptId,
  );

  const onShareClick = () => {
    makePromptPublic(undefined, {
      onSuccess: () => {
        copyToClipboard(`${window.location.origin}/p/${promptId}`);
        toast.success("Ссылка на промпт скопирована в буфер обмена");
        toggleOn();
      },
    });
  };

  return { isShared, isSharing, onShareClick };
};

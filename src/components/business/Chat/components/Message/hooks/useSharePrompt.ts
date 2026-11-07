import { useParams } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import { useMakePromptPublic } from "@/api";
import { useCopy } from "@/hooks/useCopy";
import { useTemporaryFlag } from "@/hooks/useTemporaryFlag";
import { ACTION_FEEDBACK_DURATION } from "../constants";

export const useSharePrompt = (promptId: string, isPublicPage: boolean) => {
  const { id: chatId } = useParams();

  const copyToClipboard = useCopy();
  const { active: isShared, toggleOn } = useTemporaryFlag(
    ACTION_FEEDBACK_DURATION,
  );

  const { makePromptPublic, isPending: isSharing } = useMakePromptPublic(
    chatId as string,
    promptId,
  );

  const copyLink = () => {
    copyToClipboard(`${window.location.origin}/p/${promptId}`);
    toast.success("Ссылка скопирована — она доступна всем, у кого есть ссылка");
    toggleOn();
  };

  const onShareClick = () => {
    if (isPublicPage) {
      copyLink();
      return;
    }

    makePromptPublic(undefined, {
      onSuccess: copyLink,
      onError: () => {
        toast.error(
          "Не удалось поделиться ответом. Обновите страницу и попробуйте ещё раз",
        );
      },
    });
  };

  return { isShared, isSharing, onShareClick };
};

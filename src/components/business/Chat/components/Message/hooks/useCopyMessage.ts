import { useCopy } from "@/hooks/useCopy";
import { useTemporaryFlag } from "@/hooks/useTemporaryFlag";
import { ACTION_FEEDBACK_DURATION } from "../constants";

export const useCopyMessage = (text: string) => {
  const copyToClipboard = useCopy();
  const { active: isCopied, toggleOn } = useTemporaryFlag(
    ACTION_FEEDBACK_DURATION,
  );

  const onCopyClick = () => {
    copyToClipboard(text);
    toggleOn();
  };

  return { isCopied, onCopyClick };
};

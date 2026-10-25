import { useEffect, useRef } from "react";
import { useFiles } from "@/providers/FilesProvider/useFiles";

export const useResetAttachments = (chatId: string) => {
  const { clearFiles } = useFiles();
  const openedChatIdRef = useRef(chatId);

  useEffect(() => {
    if (openedChatIdRef.current === chatId) return;

    openedChatIdRef.current = chatId;
    clearFiles();
  }, [chatId, clearFiles]);
};

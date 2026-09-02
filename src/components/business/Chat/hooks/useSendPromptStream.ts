import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { CHATS_QUERY_KEY, type Prompt, sendStreamPrompt } from "@/api";
import { useFiles } from "@/providers/FilesProvider/useFiles";
import { TOO_MANY_REQUESTS_MESSAGE_ID } from "../components/Message/constants";

export const useSendPromptStream = (
  chatId: string,
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const queryClient = useQueryClient();
  const isSendingRef = useRef(false);
  const [isPromptSending, setIsPromptSending] = useState(false);
  const { clearFiles } = useFiles();

  const sendPrompt = (payload: {
    input: string;
    filesIds?: string[];
    newChatId?: string;
  }) => {
    if (isPromptSending || isSendingRef.current) return;

    clearFiles();
    isSendingRef.current = true;
    setIsPromptSending(true);

    sendStreamPrompt({
      chat_id: payload.newChatId ?? (chatId as string),
      input: payload.input,
      filesIds: payload.filesIds,
    })
      .then(async (reader) => {
        const randomId = crypto.randomUUID();

        setMessages((prevMessages) => [
          {
            id: randomId,
            text: "",
            role: "model",
            files: [],
          },
          ...prevMessages.slice(1),
        ]);

        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          if (!value) continue;

          const data = JSON.parse(value.data);

          if (value.type === "complete") {
            setMessages((prevMessages) => [
              {
                id: data.promptId || randomId,
                text: data.content,
                isStreaming: false,
                role: "model",
                files: [],
              },
              ...prevMessages.slice(1),
            ]);

            clearFiles();
          } else if (value.type === "delta") {
            setMessages((prevMessages) => [
              {
                id: data.promptId || randomId,
                text: prevMessages[0].text + data.content,
                role: "model",
                isStreaming: true,
                thinking: data.isThinking
                  ? prevMessages[0].thinking + data.content
                  : prevMessages[0].thinking,
                files: [],
              },
              ...prevMessages.slice(1),
            ]);
          }
        }

        // заголовок и last_prompt бэк проставляет по завершении ответа —
        // забираем их вместо оптимистичной записи в списке чатов
        queryClient.invalidateQueries({ queryKey: CHATS_QUERY_KEY });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          if (error.status === 429) {
            setMessages((prevMessages) => [
              {
                id: TOO_MANY_REQUESTS_MESSAGE_ID,
                text: "",
                role: "model",
                isStreaming: false,
                files: [],
              },
              ...prevMessages.slice(1),
            ]);
          }
        }
      })
      .finally(() => {
        isSendingRef.current = false;
        setIsPromptSending(false);
      });
  };

  return {
    sendPrompt,
    isPromptSending,
  };
};

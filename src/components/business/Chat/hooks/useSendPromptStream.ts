import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { CHATS_QUERY_KEY, type Prompt, sendStreamPrompt } from "@/api";
import { useSearch } from "@/components/business/PromptField/useSearch";
import { useFiles } from "@/providers/FilesProvider/useFiles";
import {
  THINKING_MESSAGE_ID,
  TOO_MANY_REQUESTS_MESSAGE_ID,
  WAITING_RESPONSE_MESSAGE_ID,
} from "../components/Message/constants";
import { useStreamBuffer } from "./useStreamBuffer";
import { createErrorMessage, createInterruptedMessage } from "./utils";

export const useSendPromptStream = (
  chatId: string,
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const queryClient = useQueryClient();
  const isSendingRef = useRef(false);
  const [isPromptSending, setIsPromptSending] = useState(false);
  const { clearFiles } = useFiles();
  const { withSearch } = useSearch();
  const streamBuffer = useStreamBuffer(setMessages);

  const showThinking = () =>
    setMessages((prevMessages) =>
      prevMessages[0]?.id === WAITING_RESPONSE_MESSAGE_ID
        ? [
            { ...prevMessages[0], id: THINKING_MESSAGE_ID },
            ...prevMessages.slice(1),
          ]
        : prevMessages,
    );

  const interruptAnswer = () => {
    streamBuffer.flush();
    setMessages((prevMessages) => [
      prevMessages[0]?.text.trim()
        ? createInterruptedMessage(prevMessages[0].text)
        : createErrorMessage(),
      ...prevMessages.slice(1),
    ]);
  };

  const sendPrompt = (payload: {
    input: string;
    filesIds?: string[];
    newChatId?: string;
  }) => {
    if (isPromptSending || isSendingRef.current) return;

    clearFiles();
    isSendingRef.current = true;
    setIsPromptSending(true);

    let isFinished = false;
    let isThinking = false;

    sendStreamPrompt({
      chat_id: payload.newChatId ?? (chatId as string),
      input: payload.input,
      filesIds: payload.filesIds,
      withSearch,
    })
      .then(async (reader) => {
        const randomId = crypto.randomUUID();

        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          if (!value) continue;

          const data = JSON.parse(value.data);

          if (value.type === "complete") {
            isFinished = true;
            streamBuffer.cancel();
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
            streamBuffer.push(data.promptId || randomId, data.content);
          } else if (value.type === "thinking" && !isThinking) {
            isThinking = true;
            showThinking();
          } else if (value.type === "error") {
            isFinished = true;
            interruptAnswer();
          }
        }

        if (!isFinished) interruptAnswer();
      })
      .catch((error) => {
        if (isAxiosError(error) && error.status === 429) {
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
        } else if (!isFinished) {
          interruptAnswer();
        }
      })
      .finally(() => {
        streamBuffer.cancel();
        queryClient.invalidateQueries({ queryKey: CHATS_QUERY_KEY });
        isSendingRef.current = false;
        setIsPromptSending(false);
      });
  };

  return {
    sendPrompt,
    isPromptSending,
  };
};

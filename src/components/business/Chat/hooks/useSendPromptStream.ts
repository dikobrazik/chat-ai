import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { type Prompt, sendStreamPrompt } from "@/api";
import { useFiles } from "@/providers/FilesProvider/useFiles";

export const useSendPromptStream = (
  chatId: string,
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const isSendingRef = useRef(false);
  const [isPromptSending, setIsPromptSending] = useState(false);
  const { clearFiles } = useFiles();

  const sendPrompt = (payload: {
    input: string;
    filesIds?: string[];
    newChatId?: string;
  }) => {
    if (isPromptSending || isSendingRef.current) return;

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

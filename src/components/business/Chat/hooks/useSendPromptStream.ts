import { Prompt, sendStreamPrompt } from "@/api";

import { useState, type Dispatch, type SetStateAction } from "react";

export const useSendPromptStream = (
  chatId: string,
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const [isPromptSending, setIsPromptSending] = useState(false);

  const sendPrompt = (payload: { input: string; newChatId?: string }) => {
    setIsPromptSending(true);

    sendStreamPrompt({
      chat_id: payload.newChatId ?? (chatId as string),
      input: payload.input,
    })
      .then(async (reader) => {
        const randomId = crypto.randomUUID();

        setMessages((prevMessages) => [
          {
            id: randomId,
            text: "",
            role: "model",
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
                id: randomId,
                text: data.content,
                role: "model",
              },
              ...prevMessages.slice(1),
            ]);
          } else if (value.type === "delta") {
            setMessages((prevMessages) => [
              {
                id: randomId,
                text: prevMessages[0].text + data.content,
                role: "model",
              },
              ...prevMessages.slice(1),
            ]);
          }
        }
      })
      .finally(() => {
        setIsPromptSending(false);
      });
  };

  return {
    sendPrompt,
    isPromptSending,
  };
};

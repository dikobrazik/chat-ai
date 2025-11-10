import { Model, Prompt, sendPrompt } from "@/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { TOO_MANY_REQUESTS_MESSAGE_ID } from "../components/Message/message";

export const useSendPrompt = (
  chatId: string,
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const { mutate: sendPromptMutation, isPending: isSendPromptPending } =
    useMutation({
      mutationFn: (payload: { input: string; newChatId?: string }) =>
        sendPrompt({
          input: payload.input,
          chat_id: payload.newChatId ?? (chatId as string),
        }),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.status === 429) {
            setMessages((prevMessages) => [
              { id: TOO_MANY_REQUESTS_MESSAGE_ID, text: "", role: "model" },
              ...prevMessages.slice(1),
            ]);
          }
        }
      },
      onSuccess: ({ response }) => {
        setMessages((prevMessages) => [
          response,
          {
            id: `user-${response.id}`,
            text: prevMessages[1].text,
            role: "user",
          },
          ...prevMessages.slice(2),
        ]);
      },
    });

  return {
    sendPrompt: sendPromptMutation,
    isPromptSending: isSendPromptPending,
  };
};

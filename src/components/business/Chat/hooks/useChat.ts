import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify/unstyled";
import { CHATS_QUERY_KEY, type Chat, createChat } from "@/api";
import { useChat as useChatQuery } from "@/api/chat";
import { type Prompt, useChatPrompts } from "@/api/prompt";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { ERROR_MESSAGE_ID } from "../components/Message/constants";
import { createNewChat } from "./utils";

export const useChat = (chatId: string | undefined) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [messages, setMessages] = useState<Prompt[]>([]);
  const { model, setModel } = useModelContext();

  const { mutateAsync: createChatMutation, isPending: isCreateChatPending } =
    useMutation({
      mutationFn: (_prompt: string) => createChat({ model_id: model?.id ?? 1 }),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.status === 403) {
            const errorResponse = error.response;
            setMessages((prevMessages) => [
              {
                id: `${ERROR_MESSAGE_ID}-${Date.now()}`,
                files: [],
                text: errorResponse?.data.message ?? error.message,
                role: "model",
              },
              ...prevMessages.slice(1),
            ]);

            toast.error(errorResponse?.data.message);
          }
        }
      },
      onSuccess: (chatId) => {
        queryClient.setQueryData<Chat[]>(CHATS_QUERY_KEY, (chats) => [
          createNewChat(chatId, model?.id ?? 1),
          ...(chats ?? []),
        ]);
        window.history.replaceState({}, "", `/chat/${chatId}`);
      },
    });

  const { chat, isError, error } = useChatQuery(chatId as string);
  const { prompts = [] } = useChatPrompts(chatId as string);

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401 || error.status === 403) {
          router.replace("/");
        }
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (chat) {
      setModel({ id: chat.model_id });
    }
  }, [chat?.model_id]);

  useEffect(() => {
    if (prompts.length > 0) {
      setMessages(prompts);
    }
  }, [prompts.length]);

  return {
    messages,
    isChatCreating: isCreateChatPending,
    createChat: createChatMutation,
    setMessages,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify/unstyled";
import {
  CHATS_QUERY_KEY,
  type Chat,
  createChat,
  getChat,
  type Model,
  type Prompt,
} from "@/api";
import { useChatPrompts, useChat as useChatQuery } from "@/api/chat";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { ERROR_MESSAGE_ID } from "../components/Message/constants";

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
            const response = error.response;
            setMessages((prevMessages) => [
              {
                id: `${ERROR_MESSAGE_ID}-${Date.now()}`,
                files: response?.data.files ?? [],
                text: response?.data.message ?? error.message,
                role: "model",
              },
              ...prevMessages.slice(1),
            ]);

            toast.error(response?.data.message);
          }
        }
      },
      onSuccess: (chatId, prompt) => {
        // GET /chat не отдаёт чат, пока в нём нет ни одного промпта, поэтому
        // инвалидация тут бесполезна — кладём чат в список сами, чтобы он
        // появился в сайдбаре сразу по клику «отправить»; настоящий заголовок
        // придёт с бэка, когда модель дочитает ответ (useSendPromptStream)
        queryClient.setQueryData<Chat[]>(CHATS_QUERY_KEY, (chats) =>
          chats
            ? [
                {
                  id: chatId,
                  title: "Новый чат",
                  last_prompt: prompt,
                  is_pinned: false,
                  model_id: model?.id ?? 1,
                },
                ...chats,
              ]
            : chats,
        );
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
      if (prompts.length > 0) {
        setMessages(prompts);
      }
      setModel({ id: chat.model_id });
    }
  }, [chat, prompts]);

  return {
    messages,
    isChatCreating: isCreateChatPending,
    createChat: createChatMutation,
    setMessages,
  };
};

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
                  external_chat_id: "",
                  user_id: "",
                  title: "Новый чат",
                  last_prompt: prompt,
                  created_at: new Date().toISOString(),
                },
                ...chats,
              ]
            : chats,
        );
        window.history.replaceState({}, "", `/chat/${chatId}`);
      },
    });

  const { data: chat } = useQuery({
    queryKey: ["chat", chatId],
    enabled: !!chatId && chatId !== "new",
    refetchInterval: false,
    queryFn: () =>
      getChat(chatId as string).catch((error) => {
        if (error.status === 401 || error.status === 403) {
          router.replace("/");
        }

        return {
          prompts: [],
          chat: {
            id: "",
            model: {} as Model,
          },
        };
      }),
  });

  useEffect(() => {
    if (chat) {
      if (chat.prompts.length > 0) {
        setMessages(chat.prompts);
      }
      setModel(chat.chat.model);
    }
  }, [chat]);

  return {
    messages,
    isChatCreating: isCreateChatPending,
    createChat: createChatMutation,
    setMessages,
  };
};

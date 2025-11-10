import { createChat, getChat, Model, Prompt } from "@/api";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ERROR_MESSAGE_ID } from "../components/Message/message";

export const useChat = (chatId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [messages, setMessages] = useState<Prompt[]>([]);
  const { model, setModel } = useModelContext();

  const { mutateAsync: createChatMutation, isPending: isCreateChatPending } =
    useMutation({
      mutationFn: () => createChat({ model_id: model?.id ?? 1 }),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (error.status === 403) {
            const response = error.response;
            setMessages((prevMessages) => [
              {
                id: ERROR_MESSAGE_ID,
                text: response?.data.message ?? error.message,
                role: "model",
              },
              ...prevMessages.slice(1),
            ]);
          }
        }
      },
      onSuccess: (chatId) => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        window.history.replaceState({}, "", `/chat/${chatId}`);
      },
    });

  const { data: chat } = useQuery({
    queryKey: ["chat", chatId],
    enabled: !!chatId,
    refetchInterval: false,
    queryFn: () =>
      getChat(chatId as string).catch((error) => {
        if (error.status === 401 || error.status === 403) {
          router.replace("/chat");
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
      setMessages(chat.prompts);
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

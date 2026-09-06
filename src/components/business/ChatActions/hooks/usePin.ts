import { useQueryClient } from "@tanstack/react-query";
import {
  CHATS_QUERY_KEY,
  type Chat,
  getChatQueryKey,
  updateChat,
  useChat,
} from "@/api";

export const usePin = (chatId: string) => {
  const { chat } = useChat(chatId);
  const queryClient = useQueryClient();

  const isPinned = chat?.is_pinned ?? false;

  const onPinClick = async () => {
    if (chatId) {
      await updateChat(chatId, { is_pinned: !isPinned });

      queryClient.setQueryData<Chat>(getChatQueryKey(chatId), (oldChat) => {
        if (!oldChat) return oldChat;
        return { ...oldChat, is_pinned: !isPinned };
      });

      queryClient.setQueryData<Chat[]>(CHATS_QUERY_KEY, (oldChat) => {
        if (!oldChat) return oldChat;

        return oldChat.map((chat) => {
          if (chat.id === chatId) {
            return { ...chat, is_pinned: !isPinned };
          }
          return chat;
        });
      });

      queryClient.invalidateQueries({ queryKey: CHATS_QUERY_KEY });
    }
  };

  return onPinClick;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Chat, updateChat } from "..";
import { getChatQueryKey } from "./useChat";
import { CHATS_QUERY_KEY } from "./useChats";

export const usePinChat = (chatId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (isPinned: boolean) => {
      await updateChat(chatId, { is_pinned: isPinned });

      queryClient.setQueryData(getChatQueryKey(chatId), (oldData: Chat) => {
        if (!oldData) return oldData;
        return { ...oldData, is_pinned: isPinned };
      });

      queryClient.setQueryData(CHATS_QUERY_KEY, (oldData: Chat[]) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (chat.id === chatId) {
            return { ...chat, is_pinned: isPinned };
          }
          return chat;
        });
      });

      queryClient.invalidateQueries({ queryKey: CHATS_QUERY_KEY });
    },
  });

  return { pinChat: mutation.mutate, isPending: mutation.isPending };
};

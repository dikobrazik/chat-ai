import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Chat, updateChat } from "..";
import { CHATS_QUERY_KEY } from "./useChats";

export const useRenameChat = (chatId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTitle: string) => {
      await updateChat(chatId, { title: newTitle });

      queryClient.setQueryData(CHATS_QUERY_KEY, (oldData: Chat[]) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (chat.id === chatId) {
            return { ...chat, title: newTitle };
          }
          return chat;
        });
      });
    },
  });

  return { renameChat: mutation.mutate, isPending: mutation.isPending };
};

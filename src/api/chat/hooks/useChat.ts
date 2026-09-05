import { useQuery } from "@tanstack/react-query";
import { getChat } from "..";

export const getChatQueryKey = (chatId: string) => ["chat", chatId];

export const useChat = (chatId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    refetchInterval: false,
    enabled: Boolean(chatId),
    queryKey: getChatQueryKey(chatId),
    queryFn: () => getChat(chatId),
  });

  return { chat: data, isLoading, isError, error };
};

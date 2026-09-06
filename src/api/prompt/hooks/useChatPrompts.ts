import { useQuery } from "@tanstack/react-query";
import { getChatPrompts } from "..";

export const getChatPromptsQueryKey = (chatId: string) => [
  "chat",
  chatId,
  "prompts",
];

export const useChatPrompts = (chatId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    refetchInterval: false,
    enabled: !!chatId,
    queryKey: getChatPromptsQueryKey(chatId),
    queryFn: () => getChatPrompts(chatId),
  });

  return { prompts: data, isLoading, isError, error };
};

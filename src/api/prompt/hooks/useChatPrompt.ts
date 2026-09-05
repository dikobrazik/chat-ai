import { useQuery } from "@tanstack/react-query";
import { getChatPrompt } from "..";

export const getChatPromptQueryKey = (chatId: string, promptId: string) => [
  "chat",
  chatId,
  "prompts",
  promptId,
];

export const useChatPrompt = (_chatId: string, promptId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    refetchInterval: false,
    queryKey: getChatPromptQueryKey(promptId, promptId),
    queryFn: () => getChatPrompt(promptId, promptId),
  });

  return { prompt: data, isLoading, isError, error };
};

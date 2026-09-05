import { useMutation } from "@tanstack/react-query";
import { makePromptPublic } from "..";

export const useMakePromptPublic = (chatId: string, promptId: string) => {
  const { isPending, mutate } = useMutation({
    mutationKey: ["makePromptPublic", chatId],
    mutationFn: () => makePromptPublic(chatId, promptId),
  });

  return { makePromptPublic: mutate, isPending };
};

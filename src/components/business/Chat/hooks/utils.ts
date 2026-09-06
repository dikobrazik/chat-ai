export const createNewChat = (chatId: string, modelId: number) => ({
  id: chatId,
  title: "Новый чат",
  last_prompt: prompt,
  is_pinned: false,
  model_id: modelId ?? 1,
});

import type { Prompt } from "@/api";
import { ERROR_MESSAGE_ID } from "../components/Message/constants";

export const createNewChat = (chatId: string, modelId: string) => ({
  id: chatId,
  title: "Новый чат",
  last_prompt: prompt,
  is_pinned: false,
  model_id: modelId,
});

export const createErrorMessage = (): Prompt => ({
  id: `${ERROR_MESSAGE_ID}-${Date.now()}`,
  files: [],
  text: "В последнем сообщении произошла ошибка. Попробуйте отправить его ещё раз или обновите страницу.",
  role: "model",
});

export const createStreamingMessage = (id: string, text: string): Prompt => ({
  id,
  text,
  role: "model",
  isStreaming: true,
  files: [],
});

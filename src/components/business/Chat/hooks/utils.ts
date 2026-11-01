import type { Prompt } from "@/api";
import {
  ERROR_MESSAGE_ID,
  SYSTEM_MESSAGES,
} from "../components/Message/constants";

export const createNewChat = (chatId: string, modelId: string) => ({
  id: chatId,
  title: "Новый чат",
  last_prompt: prompt,
  is_pinned: false,
  model_id: modelId,
});

const isLocalMessage = ({ id }: Pick<Prompt, "id">) =>
  SYSTEM_MESSAGES.includes(id) || id.startsWith(ERROR_MESSAGE_ID);

const isFinishedAnswer = (message: Prompt) =>
  message.role === "model" && !message.isStreaming && !isLocalMessage(message);

const countSameMessages = (
  messages: Prompt[],
  { role, text }: Pick<Prompt, "role" | "text">,
) =>
  messages.filter(
    (message) =>
      !isLocalMessage(message) &&
      message.role === role &&
      message.text === text,
  ).length;

const isLastExchangeSaved = (messages: Prompt[], prompts: Prompt[]) => {
  const [lastMessage, lastQuestion] = messages;

  if (!lastMessage) return true;

  const messageToCheck = isFinishedAnswer(lastMessage)
    ? lastMessage
    : lastQuestion;

  return (
    messageToCheck !== undefined &&
    countSameMessages(prompts, messageToCheck) >=
      countSameMessages(messages, messageToCheck)
  );
};

export const mergeWithServer = (messages: Prompt[], prompts: Prompt[]) =>
  isLastExchangeSaved(messages, prompts)
    ? prompts
    : [...messages.slice(0, 2), ...prompts];

import type { AxiosResponse } from "axios";
import type { Prompt } from "@/api";
import { formatTime } from "@/utils/format-time";
import {
  ERROR_MESSAGE_ID,
  SYSTEM_MESSAGES,
  TOO_MANY_REQUESTS_MESSAGE_ID,
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

export const withoutLimitBanner = (messages: Prompt[]) =>
  messages.filter(({ id }) => id !== TOO_MANY_REQUESTS_MESSAGE_ID);

const getUtcDayEnd = () => new Date().setUTCHours(24, 0, 0, 0);

export const getLimitResetTime = (headers?: AxiosResponse["headers"]) => {
  const retryAfter = Number(
    headers?.["retry-after-prompt"] ?? headers?.["retry-after"],
  );

  if (!retryAfter) return "";

  return formatTime(Math.min(Date.now() + retryAfter * 1000, getUtcDayEnd()));
};

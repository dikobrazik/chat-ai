import type { AxiosResponse } from "axios";
import type { Prompt, PromptLimit } from "@/api";
import {
  ERROR_MESSAGE_ID,
  REGISTER_REMINDER_MESSAGE_ID,
  SYSTEM_MESSAGES,
  TOO_MANY_REQUESTS_MESSAGE_ID,
} from "../components/Message/constants";
import {
  LIMIT_REASON,
  LIMIT_REASON_BY_RESPONSE,
  LIMIT_RESPONSE_FIELDS,
  RETRY_AFTER_HEADERS,
} from "./constants";

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

const mergeLastExchange = (messages: Prompt[], prompts: Prompt[]) =>
  isLastExchangeSaved(messages, prompts)
    ? prompts
    : [...messages.slice(0, 2), ...prompts];

export const mergeWithServer = (messages: Prompt[], prompts: Prompt[]) => {
  const [lastMessage, ...olderMessages] = messages;

  return lastMessage?.id === REGISTER_REMINDER_MESSAGE_ID
    ? [lastMessage, ...mergeLastExchange(olderMessages, prompts)]
    : mergeLastExchange(messages, prompts);
};

export const withoutLimitBanner = (messages: Prompt[]) =>
  messages.filter(({ id }) => id !== TOO_MANY_REQUESTS_MESSAGE_ID);

export const withoutRegisterReminder = (messages: Prompt[]) =>
  messages.filter(({ id }) => id !== REGISTER_REMINDER_MESSAGE_ID);

const getUtcDayEnd = () => new Date().setUTCHours(24, 0, 0, 0);

const getHeadersResetAt = (headers?: AxiosResponse["headers"]) => {
  const retryAfter = Number(
    headers?.[RETRY_AFTER_HEADERS.prompt] ??
      headers?.[RETRY_AFTER_HEADERS.common],
  );

  return retryAfter
    ? Math.min(Date.now() + retryAfter * 1000, getUtcDayEnd())
    : null;
};

const readLimitBody = (
  data: unknown,
): Promise<Partial<Record<string, string>> | null> =>
  new Response(data as BodyInit).json().catch(() => null);

export const getLimit = async (
  response?: AxiosResponse,
): Promise<PromptLimit> => {
  const body = await readLimitBody(response?.data);
  const resetAt = Date.parse(String(body?.[LIMIT_RESPONSE_FIELDS.resetAt]));

  return {
    reason:
      LIMIT_REASON_BY_RESPONSE[String(body?.[LIMIT_RESPONSE_FIELDS.reason])] ??
      LIMIT_REASON.unknown,
    resetAt: Number.isNaN(resetAt)
      ? getHeadersResetAt(response?.headers)
      : resetAt,
  };
};

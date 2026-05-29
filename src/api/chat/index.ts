import EventSourceStream from "@server-sent-stream/web";
import axios from "axios";
import type { Model } from "../model";

type SendPromptRequest = {
  input: string;
  chat_id?: string;
  filesIds?: string[];
};

export const sendStreamPrompt = ({
  chat_id,
  input,
  filesIds,
}: SendPromptRequest) =>
  axios
    .get(`chat/${chat_id}/prompt-stream`, {
      headers: {
        Accept: "text/event-stream",
      },
      params: { input, files_ids: filesIds },
      responseType: "stream",
      adapter: "fetch", // <- this option can also be set in axios.create()
    })
    .then(async (response) => {
      const stream = response.data as ReadableStream;

      const decoder = new EventSourceStream();

      const reader = decoder.readable.getReader();

      stream.pipeThrough(decoder);

      return reader;
    });

export const createChat = (payload: { model_id: number }) =>
  axios.post<string>(`chat`, payload).then((response) => response.data);

type Chat = {
  id: string;
  external_chat_id: string;
  user_id: string;
  title: null | string;
  last_prompt: null | string;
  created_at: string;
};

export const getChats = () =>
  axios.get<Chat[]>(`chat`).then((response) => response.data);

export type ChatResponse = {
  prompts: Prompt[];
  chat: ChatInfo;
};

export type ChatInfo = {
  id: string;
  model: Model;
};

type PromptFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

export type Prompt = {
  id: string;
  text: string;
  files: PromptFile[];
  role: string;
};

export const getChat = (chatId: string) =>
  axios.get<ChatResponse>(`chat/${chatId}`).then((response) => response.data);

export const getImageUrl = ({
  chatId,
  promptId,
}: {
  chatId: string;
  promptId: string;
}) =>
  axios
    .get<string>(`chat/${chatId}/prompt/${promptId}/image`)
    .then((response) => response.data);

export const patchChatPublic = ({ chatId }: { chatId: string }) =>
  axios
    .patch<string>(`chat/${chatId}/public`)
    .then((response) => response.data);

export * from "./hooks";

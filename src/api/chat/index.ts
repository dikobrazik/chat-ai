import axios from "axios";
import { Model } from "../model";
import EventSourceStream from "@server-sent-stream/web";

type SendPromptResponse = {
  chatId: string;
  response: Prompt;
};

type SendPromptRequest = {
  input: string;
  chat_id?: string;
};

export const sendPrompt = ({ chat_id, ...payload }: SendPromptRequest) =>
  axios
    .post<SendPromptResponse>(`chat/${chat_id}/prompt`, payload)
    .then((response) => response.data);

export const sendStreamPrompt = ({ chat_id, input }: SendPromptRequest) =>
  axios
    .get(`chat/${chat_id}/prompt-stream`, {
      headers: {
        Accept: "text/event-stream",
      },
      params: { input },
      responseType: "stream",
      adapter: "fetch", // <- this option can also be set in axios.create()
    })
    .then(async (response) => {
      console.log("axios got a response", response.data);
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

export type Prompt = {
  id: string;
  text: string;
  role: string;
};

export const getChat = (chatId: string) =>
  axios.get<ChatResponse>(`chat/${chatId}`).then((response) => response.data);

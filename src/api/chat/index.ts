import axios from "axios";
import { Model } from "../model";

type SendPromptResponse = {
  chatId: string;
  response: Prompt;
};

export const sendPrompt = ({
  chat_id,
  ...payload
}: {
  input: string;
  chat_id?: string;
  model_id?: number;
}) =>
  axios
    .post<SendPromptResponse>(`chat/${chat_id}/prompt`, payload)
    .then((response) => response.data);

export const createChat = (payload: { model_id: number }) =>
  axios.post<string>(`chat`, payload).then((response) => response.data);

type Chat = {
  id: string;
  external_chat_id: string;
  user_id: string;
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

import axios from "axios";

type SendPromptResponse = {
  chatId: string;
  response: {
    id: string;
    text: string;
  };
}

export const sendPrompt = (payload: {input: string, chatId?: string}) =>
  axios.post<SendPromptResponse>("chat/prompt", payload).then((response) => response.data);

type Model = {
  id: string;
  description: string;
}

export const getModels = () =>
  axios.get<Model[]>("chat/models").then((response) => response.data);

type Chat = {
  id: string;
  external_chat_id: string;
  user_id: string;
  last_prompt: null | string;
  created_at: string;
}

export const getChats = () =>
  axios.get<Chat[]>(`chat`).then((response) => response.data);

export const getChat = (chatId: string) =>
  axios.get<string[]>(`chat/${chatId}`).then((response) => response.data);

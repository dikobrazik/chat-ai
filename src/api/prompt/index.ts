import axios from "axios";
import type { Prompt, SearchResult } from "./types";

export const searchPrompts = (search: string) =>
  axios
    .get<SearchResult[]>(
      `chat/prompt/search?search=${encodeURIComponent(search)}`,
    )
    .then((response) => response.data);

export const getChatPrompt = (chatId: string, promptId: string) =>
  axios
    .get<Prompt>(`chat/${chatId}/prompt/${promptId}`)
    .then((response) => response.data);

export const getChatPrompts = (chatId: string) =>
  axios
    .get<Prompt[]>(`chat/${chatId}/prompt`)
    .then((response) => response.data);

export const makePromptPublic = (chatId: string, promptId: string) =>
  axios.post<void>(`chat/${chatId}/prompt/${promptId}/public`);

export * from "./hooks";
export * from "./types";

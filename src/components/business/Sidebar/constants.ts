import type { Chat } from "@/api";

const createLoadingChats = (count: number): Chat[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `loading-${index}`,
    model_id: 0,
    is_pinned: false,
    title: "",
  }));

export const LOADING_PINNED_CHATS = createLoadingChats(3);
export const LOADING_CHATS = createLoadingChats(30);

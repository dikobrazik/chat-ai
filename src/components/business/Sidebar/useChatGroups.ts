import { useChats } from "@/api";
import { LOADING_CHATS, LOADING_PINNED_CHATS } from "./constants";

export const useChatGroups = () => {
  const { chats, isLoading } = useChats();

  if (isLoading) {
    return {
      pinnedChats: LOADING_PINNED_CHATS,
      unpinnedChats: LOADING_CHATS,
      isLoading,
    };
  }

  return {
    pinnedChats: chats?.filter((chat) => chat.is_pinned) ?? [],
    unpinnedChats: chats?.filter((chat) => !chat.is_pinned) ?? [],
    isLoading,
  };
};

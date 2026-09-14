import { useChats } from "@/api";

export const useChatGroups = () => {
  const { chats, isLoading } = useChats();

  return {
    pinnedChats: chats?.filter((chat) => chat.is_pinned) ?? [],
    unpinnedChats: chats?.filter((chat) => !chat.is_pinned) ?? [],
    isLoading,
  };
};

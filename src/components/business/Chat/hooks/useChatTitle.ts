import { useChats } from "@/api";

export const useChatTitle = (chatId: string) => {
  const { chats } = useChats();

  return chats?.find((chat) => chat.id === chatId)?.title;
};

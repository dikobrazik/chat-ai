import { updateChat } from "@/api";

export const usePin = (chatId: string) => {
  const onPinClick = async () => {
    if (chatId) {
      await updateChat(chatId, { is_pinned: true });
    }
  };

  return onPinClick;
};

import { useParams } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import { patchChatPublic } from "@/api";

export const useShare = () => {
  const { id: chatId } = useParams();

  const onShareClick = async () => {
    if (chatId && !Array.isArray(chatId)) {
      await patchChatPublic({ chatId });
      toast.success(
        "Ссылка скопирована — она доступна всем, у кого есть ссылка",
      );
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return onShareClick;
};

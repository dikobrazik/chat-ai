import { useParams } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import { patchChatPublic } from "@/api";
import { useCopy } from "@/hooks/useCopy";

export const useShare = () => {
  const { id: chatId } = useParams();
  const copyToClipboard = useCopy();

  const onShareClick = async () => {
    if (chatId && !Array.isArray(chatId)) {
      await patchChatPublic({ chatId });
      toast.success(
        "Ссылка скопирована — она доступна всем, у кого есть ссылка",
      );
      copyToClipboard(window.location.href);
    }
  };

  return onShareClick;
};

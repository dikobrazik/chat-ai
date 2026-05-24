import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify/unstyled";
import { useDeleteChat } from "@/api/chat/hooks/useDeleteChat";
import { useDialogModal } from "../../DialogModal/useDialogModal";

export const useDelete = (chatId: string) => {
  const router = useRouter();
  const { chatId: currentChatId } = useParams();
  const { showDialogModal, hideDialogModal } = useDialogModal();
  const deleteChat = useDeleteChat(chatId, {
    onSuccess: () => {
      toast.success("Чат успешно удалён");
      if (currentChatId === chatId) {
        router.replace("/");
      }
    },
    onError: () => {
      toast.error("Не удалось удалить чат");
    },
    onSettled: () => {
      hideDialogModal();
    },
  });

  return useCallback(() => {
    showDialogModal({
      title: "Удалить чат?",
      description: "Вы уверены, что хотите удалить этот чат?",
      actions: [
        {
          size: "m",
          variant: "base",
          children: "Отмена",
          onClick: hideDialogModal,
        },
        {
          variant: "danger",
          size: "m",
          children: "Удалить",
          onClick: () => {
            deleteChat.mutate();
          },
        },
      ],
    });
  }, []);
};

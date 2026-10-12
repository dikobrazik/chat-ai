import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import { useDeleteChat } from "@/api/chat/hooks/useDeleteChat";
import { useDialogModal } from "../../DialogModal/useDialogModal";

export const useDelete = (chatId: string) => {
  const router = useRouter();
  const { id: currentChatId } = useParams();
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

  const showConfirmation = (isDeleting: boolean) => {
    showDialogModal({
      title: "Удалить чат?",
      description: "Вы уверены, что хотите удалить этот чат?",
      actions: [
        {
          size: "m",
          variant: "base",
          disabled: isDeleting,
          children: "Отмена",
          onClick: hideDialogModal,
        },
        {
          size: "m",
          variant: "danger",
          loading: isDeleting,
          disabled: isDeleting,
          children: "Удалить",
          onClick: () => {
            showConfirmation(true);
            deleteChat.mutate();
          },
        },
      ],
    });
  };

  return () => showConfirmation(false);
};

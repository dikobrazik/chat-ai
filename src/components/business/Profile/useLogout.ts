import { useDialogModal } from "@/components/business/DialogModal/useDialogModal";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export const useLogout = () => {
  const { onLogoutClick } = useAuthContext();
  const { showDialogModal, hideDialogModal } = useDialogModal();

  return () =>
    showDialogModal({
      title: "Выход из системы",
      description: "Вы уверены, что хотите выйти из системы?",
      actions: [
        {
          size: "m",
          variant: "base",
          children: "Отменить",
          onClick: hideDialogModal,
        },
        {
          size: "m",
          variant: "danger",
          children: "Выйти",
          onClick: () => {
            hideDialogModal();
            onLogoutClick();
          },
        },
      ],
    });
};

"use client";

import { useAuthContext } from "@/providers/AuthProvider/hooks";
import Button from "@/ui/Button";
import Modal, { useModal } from "@/ui/Modal";
import { AuthorizationModal } from "./Modal";

export const AuthorizationButton = () => {
  const { isReady, isGuest, onLogoutClick } = useAuthContext();
  const { isOpen, openModal, closeModal } = useModal();

  if (!isReady) {
    return <Button loading />;
  }

  return (
    <>
      {isGuest ? (
        <Button variant="primary" onClick={openModal}>
          Войти
        </Button>
      ) : (
        <Button variant="danger" onClick={onLogoutClick}>
          Выйти
        </Button>
      )}

      <Modal onClose={closeModal} isOpen={isOpen}>
        <AuthorizationModal />
      </Modal>
    </>
  );
};

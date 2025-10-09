"use client";

import Modal, { useModal } from "@/ui/Modal";
import Button from "@/ui/Button";
import { AuthorizationModal } from "./Modal";

export const AuthorizationButton = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={openModal}>Войти</Button>

      <Modal onClose={closeModal} isOpen={isOpen}>
        <AuthorizationModal />
      </Modal>
    </>
  );
};

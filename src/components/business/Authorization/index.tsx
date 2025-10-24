"use client";

import Modal, { useModal } from "@/ui/Modal";
import Button from "@/ui/Button";
import { AuthorizationModal } from "./Modal";
import { useEffect, useState } from "react";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY,
} from "@/constants/auth";

export const AuthorizationButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(
        Boolean(localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)),
      );
    }
  }, []);

  const onLogoutClick = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_SOURCE_LOCAL_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated === undefined) {
    return <Button loading />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <Button onClick={openModal}>Войти</Button>
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

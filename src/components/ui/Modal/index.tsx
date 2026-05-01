"use client";

import React, { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import { Icon } from "../Icon";
import styles from "./Modal.module.scss";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  size?: "small" | "medium" | "large" | "fullscreen";
}

type ModalComponent = React.FC<ModalProps> & {
  Sidebar: React.FC<{ children: ReactNode; className?: string }>;
};

export const Modal: ModalComponent = ({
  isOpen,
  onClose,
  children,
  title,
  className = "",
  overlayClassName = "",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  size = "medium",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }

      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  // Create portal only on client side
  if (typeof window === "undefined") return null;

  const childrenArray = React.Children.toArray(children);

  // Filter for children that match a specific component type
  const sidebarItem = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === Modal.Sidebar,
  );

  const otherChildrenItems = childrenArray.filter((child) =>
    React.isValidElement(child) ? child.type !== Modal.Sidebar : true,
  );

  const modalContent = (
    <div
      className={`${styles.overlay} ${overlayClassName}`}
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[size]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {sidebarItem}
        <main className="w-full min-w-[70%] flex flex-col">
          {(title || showCloseButton) && (
            <div className={styles.header}>
              <h2 id="modal-title" className={styles.title}>
                {title}
              </h2>
              {showCloseButton && (
                <Button
                  leftIcon={<Icon name="close" />}
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                  variant="base"
                ></Button>
              )}
            </div>
          )}
          <div className={styles.content}>{otherChildrenItems}</div>
        </main>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

Modal.Sidebar = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <aside className={`w-[30%] p-6 ${styles.sidebar} ${className}`}>
      {children}
    </aside>
  );
};

// Hook for managing modal state
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const openModal = React.useCallback(() => setIsOpen(true), []);
  const closeModal = React.useCallback(() => setIsOpen(false), []);
  const toggleModal = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default Modal;

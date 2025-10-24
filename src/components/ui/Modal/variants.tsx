"use client";

import React from "react";
import { Modal, type ModalProps } from "./index";
import { Icon } from "../Icon";
import styles from "./ModalVariants.module.scss";

// Confirmation Modal
export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "default" | "danger" | "warning" | "success";
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  variant = "default",
  ...modalProps
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal {...modalProps} onClose={onClose} size="small">
      <div className={styles.confirmModal}>
        <div className={`${styles.confirmIcon} ${styles[variant]}`}>
          {variant === "danger" && <Icon name="alert-triangle" />}
          {variant === "warning" && <Icon name="alert-triangle" />}
          {variant === "success" && <Icon name="check-circle" />}
          {variant === "default" && <Icon name="help-circle" />}
        </div>
        <p className={styles.confirmMessage}>{message}</p>
        <div className={styles.confirmActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`${styles.confirmButton} ${styles[variant]}`}
            onClick={handleConfirm}
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Loading Modal
export interface LoadingModalProps extends Omit<ModalProps, "children"> {
  message?: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  message = "Loading...",
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      size="small"
      closeOnOverlayClick={false}
      closeOnEscape={false}
      showCloseButton={false}
    >
      <div className={styles.loadingModal}>
        <div className={styles.spinner}>
          <div className={styles.spinnerCircle}></div>
        </div>
        <p className={styles.loadingMessage}>{message}</p>
      </div>
    </Modal>
  );
};

// Alert Modal
export interface AlertModalProps extends Omit<ModalProps, "children"> {
  message: string;
  variant?: "info" | "success" | "warning" | "error";
  actionText?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  message,
  variant = "info",
  actionText = "OK",
  onClose,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps} onClose={onClose} size="small">
      <div className={styles.alertModal}>
        <div className={`${styles.alertIcon} ${styles[variant]}`}>
          {variant === "error" && <Icon name="x-circle" />}
          {variant === "warning" && <Icon name="alert-triangle" />}
          {variant === "success" && <Icon name="check-circle" />}
          {variant === "info" && <Icon name="info" />}
        </div>
        <p className={styles.alertMessage}>{message}</p>
        <div className={styles.alertActions}>
          <button
            type="button"
            className={`${styles.alertButton} ${styles[variant]}`}
            onClick={onClose}
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
          >
            {actionText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Form Modal
export interface FormModalProps extends ModalProps {
  onSubmit?: (event: React.FormEvent) => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  children,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  isSubmitting = false,
  onClose,
  ...modalProps
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <Modal {...modalProps} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.formModal}>
        <div className={styles.formContent}>{children}</div>
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            {cancelText}
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className={styles.buttonSpinner}></div>
                Loading...
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

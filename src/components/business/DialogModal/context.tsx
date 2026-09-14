"use client";

import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import type { ButtonProps } from "@/components/ui/Button";
import type { ModalProps } from "@/components/ui/Modal";

export type DialogModalProps = Omit<
  ModalProps,
  "children" | "isOpen" | "onClose"
>;

export const DialogModalContext = createContext<{
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  title: ReactNode;
  description: ReactNode;
  actions: ButtonProps[];
  content: ReactNode;
  modalProps: DialogModalProps;
  setTitle: (title: ReactNode) => void;
  setDescription: (description: ReactNode) => void;
  setActions: (actions: ButtonProps[]) => void;
  setContent: (content: ReactNode) => void;
  setModalProps: (props: DialogModalProps) => void;
}>({
  isOpen: false,
  show: () => {},
  hide: () => {},
  title: null,
  description: null,
  actions: [],
  content: null,
  modalProps: {},
  setTitle: () => {},
  setDescription: () => {},
  setActions: () => {},
  setContent: () => {},
  setModalProps: () => {},
});

export const DialogModalProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState<ReactNode>(null);
  const [description, setDescription] = useState<ReactNode>(null);
  const [actions, setActions] = useState<ButtonProps[]>([]);
  const [content, setContent] = useState<ReactNode>(null);
  const [modalProps, setModalProps] = useState<DialogModalProps>({});
  const [isOpen, setIsOpen] = useState(false);

  const show = useCallback(() => setIsOpen(true), []);
  const hide = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setModalProps({});
  }, []);

  return (
    <DialogModalContext.Provider
      value={{
        isOpen,
        show,
        hide,
        title,
        description,
        actions,
        content,
        modalProps,
        setTitle,
        setDescription,
        setActions,
        setContent,
        setModalProps,
      }}
    >
      {children}
    </DialogModalContext.Provider>
  );
};

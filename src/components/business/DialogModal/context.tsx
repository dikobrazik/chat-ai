"use client";

import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from "react";
import type { ButtonProps } from "@/components/ui/Button";
import { useToggle } from "@/hooks/useToggle";

export const DialogModalContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  title: ReactNode;
  description: ReactNode;
  actions: ButtonProps[];
  setTitle: (title: ReactNode) => void;
  setDescription: (description: ReactNode) => void;
  setActions: (actions: ButtonProps[]) => void;
}>({
  isOpen: false,
  toggle: () => {},
  title: null,
  description: null,
  actions: [],
  setTitle: () => {},
  setDescription: () => {},
  setActions: () => {},
});

export const DialogModalProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState<ReactNode>(null);
  const [description, setDescription] = useState<ReactNode>(null);
  const [actions, setActions] = useState<ButtonProps[]>([]);
  const { active, toggle } = useToggle();

  return (
    <DialogModalContext.Provider
      value={{
        isOpen: active,
        toggle,
        title,
        description,
        actions,
        setTitle,
        setDescription,
        setActions,
      }}
    >
      {children}
    </DialogModalContext.Provider>
  );
};

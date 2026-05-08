import { type ReactNode, useContext } from "react";
import type { ButtonProps } from "@/components/ui/Button";
import { DialogModalContext } from "./context";

type DialogModalOptions = {
  title: ReactNode;
  description: ReactNode;
  actions: ButtonProps[];
};

export const useDialogModal = () => {
  const dialogModalContext = useContext(DialogModalContext);

  return {
    showDialogModal: (options: DialogModalOptions) => {
      dialogModalContext.setTitle(options.title);
      dialogModalContext.setDescription(options.description);
      dialogModalContext.setActions(options.actions);
      dialogModalContext.toggle();
    },
    hideDialogModal: () => {
      dialogModalContext.toggle();
    },
  };
};

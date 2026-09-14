import { type ReactNode, useContext } from "react";
import type { ButtonProps } from "@/components/ui/Button";
import { DialogModalContext, type DialogModalProps } from "./context";

type DialogModalOptions = {
  title: ReactNode;
  description: ReactNode;
  actions: ButtonProps[];
};

type ContentModalOptions = DialogModalProps & {
  content: ReactNode;
};

export const useDialogModal = () => {
  const dialogModalContext = useContext(DialogModalContext);

  return {
    showDialogModal: (options: DialogModalOptions) => {
      dialogModalContext.setContent(null);
      dialogModalContext.setModalProps({});
      dialogModalContext.setTitle(options.title);
      dialogModalContext.setDescription(options.description);
      dialogModalContext.setActions(options.actions);
      dialogModalContext.show();
    },
    showModal: ({ content, ...modalProps }: ContentModalOptions) => {
      dialogModalContext.setTitle(null);
      dialogModalContext.setDescription(null);
      dialogModalContext.setActions([]);
      dialogModalContext.setContent(content);
      dialogModalContext.setModalProps(modalProps);
      dialogModalContext.show();
    },
    hideDialogModal: dialogModalContext.hide,
  };
};

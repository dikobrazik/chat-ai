"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { DialogModalContext } from "./context";

export const DialogModal = () => {
  const dialogModalContext = useContext(DialogModalContext);

  return (
    <Modal
      headerBorder={false}
      isOpen={dialogModalContext.isOpen}
      onClose={dialogModalContext.toggle}
      size="small"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center">
          {dialogModalContext.title && (
            <Text as="h6" type="l">
              {dialogModalContext.title}
            </Text>
          )}
          {dialogModalContext.description && (
            <Text type="s" color="#6F6F6F" style="regular">
              {dialogModalContext.description}
            </Text>
          )}
        </div>

        <div className="flex gap-3">
          {dialogModalContext.actions.map((actionProps, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div className="flex flex-1" key={index}>
              <Button fullWidth align="center" {...actionProps} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

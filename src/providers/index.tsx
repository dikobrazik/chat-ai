"use client";

import { DialogModalProvider } from "@/components/business/DialogModal/context";
import { AuthProvider } from "./AuthProvider/Provider";
import { ChatSettingsProvider } from "./ChatSettingsProvider/Provider";
import { EmailAuthProvider } from "./EmailAuthProvider";
import { FilesProvider } from "./FilesProvider";
import { QueryProvider } from "./QueryProvider/Provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <EmailAuthProvider>
          <ChatSettingsProvider>
            <DialogModalProvider>
              <FilesProvider>{children}</FilesProvider>
            </DialogModalProvider>
          </ChatSettingsProvider>
        </EmailAuthProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

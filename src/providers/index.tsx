"use client";

import { DialogModalProvider } from "@/components/business/DialogModal/context";
import { AuthProvider } from "./AuthProvider/Provider";
import { FilesProvider } from "./FilesProvider";
import { ModelProvider } from "./ModelProvider/Provider";
import { QueryProvider } from "./QueryProvider/Provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ModelProvider>
          <DialogModalProvider>
            <FilesProvider>{children}</FilesProvider>
          </DialogModalProvider>
        </ModelProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

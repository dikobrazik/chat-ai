"use client";

import type { Model } from "@/api";
import { usePersistentState } from "@/hooks/usePersistenState";
import { ChatSettingsContext } from "./context";

export const ChatSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [model, setModel] = usePersistentState<Pick<Model, "id"> | null>(
    "model",
    null,
  );
  const [withSearch, setWithSearch] = usePersistentState<boolean>(
    "with-search",
    false,
  );

  return (
    <ChatSettingsContext.Provider
      value={{ model, setModel, withSearch, setWithSearch }}
    >
      {children}
    </ChatSettingsContext.Provider>
  );
};

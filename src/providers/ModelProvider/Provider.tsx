"use client";

import type { Model } from "@/api";
import { usePersistentState } from "@/hooks/usePersistenState";
import { ModelContext } from "./context";

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [model, setModel] = usePersistentState<Pick<Model, "id"> | null>(
    "model",
    null,
  );

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};

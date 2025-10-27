"use client";

import { useState } from "react";
import { ModelContext } from "./context";
import { Model } from "@/api";

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [model, setModel] = useState<Model | null>(null);

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};

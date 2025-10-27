import { Model } from "@/api";
import { createContext } from "react";

export const ModelContext = createContext<{
  model: Model | null;
  setModel: (model: Model | null) => void;
}>({
  model: null,
  setModel: () => {},
});


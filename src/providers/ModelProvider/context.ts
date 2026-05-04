import { createContext } from "react";
import type { Model } from "@/api";

export const ModelContext = createContext<{
  model: Pick<Model, "id"> | null;
  setModel: (model: Pick<Model, "id"> | null) => void;
}>({
  model: null,
  setModel: () => {},
});

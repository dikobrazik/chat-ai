import { createContext } from "react";
import type { Model } from "@/api";

export const ChatSettingsContext = createContext<{
  model: Pick<Model, "id"> | null;
  setModel: (model: Pick<Model, "id"> | null) => void;
  withSearch: boolean;
  setWithSearch: (withSearch: boolean) => void;
}>({
  model: null,
  setModel: () => {},
  withSearch: false,
  setWithSearch: () => {},
});

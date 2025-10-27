import { useContext } from "react";
import { ModelContext } from "./context";

export const useModelContext = () => {
  const context = useContext(ModelContext);

  return context;
}
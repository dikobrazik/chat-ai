import { useContext } from "react";
import { SearchContext } from "./context";

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  return context;
};

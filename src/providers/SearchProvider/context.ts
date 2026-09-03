import { createContext } from "react";

export const SearchContext = createContext<{
  withSearch: boolean;
  setWithSearch: (withSearch: boolean) => void;
}>({
  withSearch: false,
  setWithSearch: () => {},
});

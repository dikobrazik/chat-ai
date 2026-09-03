"use client";

import { usePersistentState } from "@/hooks/usePersistenState";
import { SearchContext } from "./context";

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [withSearch, setWithSearch] = usePersistentState<boolean>(
    "with-search",
    false,
  );

  return (
    <SearchContext.Provider value={{ withSearch, setWithSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

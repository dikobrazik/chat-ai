import { useEffect, useState } from "react";

export function usePersistentState<T>(
  key: string,
  initialState: T | (() => T),
) {
  const prefixedKey = "use-persistent-state-" + key;
  // read key from session storage if not found use default value
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(prefixedKey);
    if (storedValue === null) {
      if (typeof initialState === "function") {
        return (initialState as () => T)();
      } else {
        return initialState;
      }
    } else {
      return JSON.parse(storedValue);
    }
  });
  // update session storage when value changes
  useEffect(() => {
    sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}

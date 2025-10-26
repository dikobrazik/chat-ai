import { useCallback, useState } from "react";

/**
 * useToggle - React hook for toggling boolean state
 * @param initialValue Initial boolean value (default: false)
 * @returns [value, toggle, setTrue, setFalse]
 */
export function useToggle(initialValue: boolean = false){
  const [active, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const toggleOn = useCallback(() => setValue(true), []);
  const toggleOff = useCallback(() => setValue(false), []);

  return {active, toggle, toggleOn, toggleOff};
}

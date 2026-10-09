import { useEffect, useRef } from "react";
import { useToggle } from "@/hooks/useToggle";

export const useTemporaryFlag = (duration: number) => {
  const { active, toggleOn: activate, toggleOff } = useToggle();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const toggleOn = () => {
    clearTimeout(timeoutRef.current);
    activate();
    timeoutRef.current = setTimeout(toggleOff, duration);
  };

  return { active, toggleOn };
};

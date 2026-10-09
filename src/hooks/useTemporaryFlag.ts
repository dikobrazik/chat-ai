import { useEffect, useRef, useState } from "react";

export const useTemporaryFlag = (duration: number) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const toggleOn = () => {
    clearTimeout(timeoutRef.current);
    setActive(true);
    timeoutRef.current = setTimeout(() => setActive(false), duration);
  };

  return { active, toggleOn };
};

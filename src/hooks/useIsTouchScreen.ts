import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

const COARSE_POINTER_QUERY = "(pointer: coarse)";
const FINE_POINTER_QUERY = "(any-pointer: fine)";

export function useIsTouchScreen() {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const coarsePointer = window.matchMedia(COARSE_POINTER_QUERY);
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const onChange = () => {
      setIsTouchScreen(coarsePointer.matches && !finePointer.matches);
    };

    coarsePointer.addEventListener("change", onChange);
    finePointer.addEventListener("change", onChange);
    onChange();

    return () => {
      coarsePointer.removeEventListener("change", onChange);
      finePointer.removeEventListener("change", onChange);
    };
  }, []);

  return isTouchScreen;
}

import { useEffect } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { useToggle } from "@/hooks/useToggle";

export const useSidebarState = () => {
  const isMobile = useIsMobile();
  const { active: isOpen, toggle, toggleOn, toggleOff } = useToggle();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isMobile) {
        toggleOn();
      } else {
        toggleOff();
      }
    }
  }, [isMobile]);

  return { isOpen, toggle };
};

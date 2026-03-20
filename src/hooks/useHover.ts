import { useState } from "react";

export const useHover = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  };
};

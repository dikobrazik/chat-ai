import { useState } from "react";

export const useAnswerImage = (src: string) => {
  const [brokenSrc, setBrokenSrc] = useState<string>();

  return {
    isBroken: brokenSrc === src,
    onError: () => setBrokenSrc(src),
  };
};

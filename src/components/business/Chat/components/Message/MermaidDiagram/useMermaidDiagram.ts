import { useContext, useEffect, useState } from "react";
import { StreamdownContext } from "streamdown";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useIsDarkScheme } from "@/hooks/useIsDarkScheme";
import { MERMAID_SETTLE_DELAY } from "./constants";
import { getRenderedMermaid, renderMermaid } from "./mermaid";

export const useMermaidDiagram = (code: string, isIncomplete: boolean) => {
  const { isAnimating, lineNumbers } = useContext(StreamdownContext);
  const scheme = useIsDarkScheme() ? "dark" : "light";
  const settledCode = useDebouncedValue(code, MERMAID_SETTLE_DELAY);
  const [diagram, setDiagram] = useState(() =>
    getRenderedMermaid(code, scheme),
  );
  const [isFailed, setIsFailed] = useState(false);
  const isSettled = !isAnimating || settledCode === code;

  useEffect(() => {
    if (isIncomplete || !isSettled) return;
    let isActual = true;
    renderMermaid(code, scheme).then(
      (nextDiagram) => {
        if (!isActual) return;
        setDiagram(nextDiagram);
        setIsFailed(false);
      },
      () => {
        if (!isActual || isAnimating) return;
        setDiagram(undefined);
        setIsFailed(true);
      },
    );
    return () => {
      isActual = false;
    };
  }, [code, scheme, isIncomplete, isSettled, isAnimating]);

  return {
    diagram,
    lineNumbers,
    isFailed: isFailed && !isAnimating,
  };
};

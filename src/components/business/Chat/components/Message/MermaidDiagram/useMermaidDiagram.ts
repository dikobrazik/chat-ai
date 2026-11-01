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
  const [svg, setSvg] = useState(() => getRenderedMermaid(code, scheme));
  const [isFailed, setIsFailed] = useState(false);
  const isSettled = !isAnimating || settledCode === code;

  useEffect(() => {
    if (isIncomplete || !isSettled) return;
    let isActual = true;
    renderMermaid(code, scheme).then(
      (nextSvg) => {
        if (!isActual) return;
        setSvg(nextSvg);
        setIsFailed(false);
      },
      () => {
        if (!isActual || isAnimating) return;
        setSvg(undefined);
        setIsFailed(true);
      },
    );
    return () => {
      isActual = false;
    };
  }, [code, scheme, isIncomplete, isSettled, isAnimating]);

  return {
    svg,
    lineNumbers,
    isFailed: isFailed && !isAnimating,
  };
};

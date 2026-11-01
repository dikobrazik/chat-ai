import { useCallback } from "react";

export const useSvgRef = (svg: string) =>
  useCallback(
    (element: HTMLDivElement | null) => {
      if (element) element.innerHTML = svg;
    },
    [svg],
  );

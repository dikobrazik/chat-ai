import {
  MERMAID_ARROWS,
  MERMAID_EDGE_RADIUS,
  MERMAID_EXPORT,
  MERMAID_FONT_VARIABLE,
  MERMAID_NODE_RADIUS,
  MERMAID_TERMINAL_LABEL,
} from "./constants";

type Point = { x: number; y: number };

const NUMBER_PATTERN = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

const POLYLINE_PATTERN = /^M[\d\s.,eE+L-]+$/;

const EPSILON = 0.01;

const parseSvg = (svg: string) =>
  new DOMParser().parseFromString(svg, "text/html").querySelector("svg");

const format = (value: number) => Number(value.toFixed(2));

const formatPoint = ({ x, y }: Point) => `${format(x)},${format(y)}`;

const getDistance = (from: Point, to: Point) =>
  Math.hypot(to.x - from.x, to.y - from.y);

const moveTowards = (from: Point, to: Point, length: number): Point => {
  const ratio = length / getDistance(from, to);
  return {
    x: from.x + (to.x - from.x) * ratio,
    y: from.y + (to.y - from.y) * ratio,
  };
};

const isSamePoint = (first: Point, second: Point) =>
  getDistance(first, second) < EPSILON;

const isStraight = (first: Point, middle: Point, last: Point) =>
  Math.abs(
    (middle.x - first.x) * (last.y - middle.y) -
      (middle.y - first.y) * (last.x - middle.x),
  ) < EPSILON;

const toPoints = (path: string) => {
  const numbers = (path.match(NUMBER_PATTERN) ?? []).map(Number);
  return Array.from({ length: Math.floor(numbers.length / 2) }, (_, index) => ({
    x: numbers[index * 2],
    y: numbers[index * 2 + 1],
  }));
};

const toCorners = (points: Point[]) => {
  const corners: Point[] = [];
  for (const point of points) {
    const last = corners.at(-1);
    const beforeLast = corners.at(-2);
    if (last && isSamePoint(last, point)) continue;
    if (last && beforeLast && isStraight(beforeLast, last, point)) {
      corners.pop();
    }
    corners.push(point);
  }
  return corners;
};

const toRoundedPath = (points: Point[]) => {
  const turns = points.slice(1, -1).map((corner, index) => {
    const previous = points[index];
    const next = points[index + 2];
    const radius = Math.min(
      MERMAID_EDGE_RADIUS,
      getDistance(previous, corner) / 2,
      getDistance(corner, next) / 2,
    );
    const start = moveTowards(corner, previous, radius);
    const end = moveTowards(corner, next, radius);
    return `L${formatPoint(start)}Q${formatPoint(corner)} ${formatPoint(end)}`;
  });
  return `M${formatPoint(points[0])}${turns.join("")}L${formatPoint(points[points.length - 1])}`;
};

const roundNodes = (root: SVGSVGElement) => {
  for (const rect of root.querySelectorAll(
    ".node rect.label-container, .cluster rect",
  )) {
    const radius = Math.min(
      MERMAID_NODE_RADIUS,
      Number(rect.getAttribute("height")) / 2,
    );
    rect.setAttribute("rx", String(radius));
    rect.setAttribute("ry", String(radius));
  }
};

const roundEdges = (root: SVGSVGElement) => {
  for (const edge of root.querySelectorAll('path[data-edge="true"]')) {
    const path = edge.getAttribute("d") ?? "";
    if (!POLYLINE_PATTERN.test(path)) continue;
    const corners = toCorners(toPoints(path));
    if (corners.length > 1) edge.setAttribute("d", toRoundedPath(corners));
  }
};

const thinArrows = (root: SVGSVGElement) => {
  for (const [marker, path] of Object.entries(MERMAID_ARROWS)) {
    for (const arrow of root.querySelectorAll(
      `marker[id$="_${marker}"] path`,
    )) {
      arrow.setAttribute("d", path);
      arrow.setAttribute("fill", "none");
    }
  }
};

const centerTerminalLabels = (root: SVGSVGElement) => {
  for (const terminal of root.querySelectorAll(".edgeTerminals")) {
    const inner = terminal.querySelector(".inner");
    const label = terminal.querySelector("foreignObject");
    if (!inner || !label) continue;
    inner.append(label);
    const { width, height } = MERMAID_TERMINAL_LABEL;
    label.setAttribute(
      "x",
      String((Number(label.getAttribute("width")) - width) / 2),
    );
    label.setAttribute(
      "y",
      String((Number(label.getAttribute("height")) - height) / 2),
    );
    label.setAttribute("width", String(width));
    label.setAttribute("height", String(height));
    label.removeAttribute("style");
    label.firstElementChild?.removeAttribute("style");
  }
};

const raiseEdgeLabels = (root: SVGSVGElement) => {
  for (const labels of root.querySelectorAll(".edgeLabels")) {
    labels.parentElement?.append(labels);
  }
};

const setNaturalSize = (root: SVGSVGElement) => {
  for (const side of ["width", "height"]) {
    const size = Number(root.getAttribute(side));
    if (size > 0) root.style.setProperty(`--natural-${side}`, `${size}px`);
  }
};

export const decorateSvg = (svg: string) => {
  const root = parseSvg(svg);
  if (!root) return svg;
  roundNodes(root);
  roundEdges(root);
  thinArrows(root);
  centerTerminalLabels(root);
  raiseEdgeLabels(root);
  setNaturalSize(root);
  return root.outerHTML;
};

const toExportSvg = (svg: string) => {
  const root = parseSvg(svg);
  if (!root) return svg;
  root.setAttribute("style", `background-color: ${MERMAID_EXPORT.background}`);
  return new XMLSerializer()
    .serializeToString(root)
    .replaceAll(MERMAID_FONT_VARIABLE, MERMAID_EXPORT.font);
};

export const downloadSvg = (svg: string) => {
  const url = URL.createObjectURL(
    new Blob([toExportSvg(svg)], { type: MERMAID_EXPORT.type }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = MERMAID_EXPORT.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

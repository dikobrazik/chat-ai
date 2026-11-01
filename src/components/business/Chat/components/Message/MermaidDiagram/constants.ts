import type { MermaidConfig } from "mermaid";

export const MERMAID_ID_PREFIX = "jonu-mermaid-";

export const MERMAID_CACHE_LIMIT = 50;

export const MERMAID_SETTLE_DELAY = 300;

export const MERMAID_LINK_TAG = '<a target="_blank" rel="noopener noreferrer" ';

export const MERMAID_FLOWCHART_TYPES = new Set(["flowchart", "flowchart-v2"]);

export const MERMAID_CLASS_TYPES = new Set(["class", "classDiagram"]);

export const MERMAID_NO_RELATION_TITLE = "none";

export const MERMAID_DOTTED_LINE = 1;

export const MERMAID_DECISION_CLASS = "jonuDecision";

export const MERMAID_NODE_RADIUS = 14;

export const MERMAID_EDGE_RADIUS = 6;

export const MERMAID_ARROWS = {
  "flowchart-v2-pointEnd": { path: "M 6 1 L 10 5 L 6 9", tip: "10" },
  "flowchart-v2-pointStart": { path: "M 4 1 L 0 5 L 4 9", tip: "0" },
};

export const MERMAID_ARROW_STROKE = "1.5";

export const MERMAID_MAX_JOG = 6;

export const MERMAID_TERMINAL_LABEL = { width: 64, height: 24 };

export const MERMAID_EXPORT = {
  fileName: "diagram.svg",
  type: "image/svg+xml",
  background: "#FFFFFF",
  font: "Rubik, Arial",
};

export const MERMAID_FONT_VARIABLE = "var(--font-rubik)";

const APP_FONT = `${MERMAID_FONT_VARIABLE}, sans-serif`;

const NATURAL_SIZE = { useMaxWidth: false };

const BASE_CONFIG: MermaidConfig = {
  startOnLoad: false,
  securityLevel: "strict",
  suppressErrorRendering: true,
  theme: "base",
  fontFamily: APP_FONT,
  dompurifyConfig: { FORBID_TAGS: ["style", "img"] },
  flowchart: {
    ...NATURAL_SIZE,
    curve: "step",
    padding: 18,
    wrappingWidth: 180,
  },
  sequence: NATURAL_SIZE,
  gantt: NATURAL_SIZE,
  class: { ...NATURAL_SIZE, hideEmptyMembersBox: true },
  state: NATURAL_SIZE,
  er: NATURAL_SIZE,
  journey: NATURAL_SIZE,
  mindmap: NATURAL_SIZE,
  timeline: NATURAL_SIZE,
  gitGraph: NATURAL_SIZE,
};

const PIE_COLORS = {
  pie1: "#0F8AFF",
  pie2: "#14C240",
  pie3: "#FF6B34",
  pie4: "#FC3F1D",
  pie5: "#6F6F6F",
  pie6: "#9C9C9C",
  pie7: "#D7D7D7",
  pie8: "#0076EB",
  pie9: "#239EFF",
  pie10: "#FD654A",
  pie11: "#ADDBFF",
  pie12: "#EFEFEF",
  pieOpacity: "1",
  pieSectionTextColor: "#171717",
};

type DiagramColors = {
  background: string;
  text: string;
  line: string;
  node: string;
  nodeBorder: string;
  nodeText: string;
  decision: string;
  decisionBorder: string;
  group: string;
  groupBorder: string;
  note: string;
  noteBorder: string;
};

const LIGHT_COLORS: DiagramColors = {
  background: "#FFFFFF",
  text: "#171717",
  line: "#8E8E8E",
  node: "#E4F3FF",
  nodeBorder: "#CFDBE5",
  nodeText: "#004F99",
  decision: "#F5FAFF",
  decisionBorder: "#CFDBE5",
  group: "#F7F7F7",
  groupBorder: "#EFEFEF",
  note: "#F7F7F7",
  noteBorder: "#D7D7D7",
};

const DARK_COLORS: DiagramColors = {
  background: "#0A0A0A",
  text: "#EDEDED",
  line: "#8E8E8E",
  node: "#0B1F31",
  nodeBorder: "#0C3358",
  nodeText: "#ADDBFF",
  decision: "#0A141E",
  decisionBorder: "#1F4A73",
  group: "#181818",
  groupBorder: "#2A2A2A",
  note: "#1E1E1E",
  noteBorder: "#3B3B3B",
};

const getThemeCss = (colors: DiagramColors) => `
  .nodeLabel, .nodeLabel p { font-weight: 500; line-height: 1.15; }
  .node > .label .nodeLabel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 24px;
  }
  .members-group p, .methods-group p { font-weight: 400; }
  .node.${MERMAID_DECISION_CLASS} rect {
    fill: ${colors.decision};
    stroke: ${colors.decisionBorder};
    stroke-dasharray: 2 2;
  }
  .labelBkg { background: transparent; }
  .edgeLabel p { margin: 0; }
  .edgeLabel span.edgeLabel:not(:empty) {
    display: inline-block;
    padding: 2px 12px;
    border: 1px solid ${colors.decisionBorder};
    border-radius: 999px;
    background: ${colors.decision};
    color: ${colors.nodeText};
    font-weight: 500;
  }
  .edgeTerminals foreignObject { overflow: visible; }
  .edgeTerminals foreignObject > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .edgeTerminals span.edgeLabel {
    padding: 0 6px;
    border: 1px solid ${colors.decisionBorder};
    border-radius: 999px;
    background: ${colors.decision};
    color: ${colors.nodeText};
    font-size: 12px;
    line-height: 18px;
    white-space: nowrap;
  }
`;

const getConfig = (
  colors: DiagramColors,
  darkMode: boolean,
): MermaidConfig => ({
  ...BASE_CONFIG,
  themeCSS: getThemeCss(colors),
  themeVariables: {
    ...PIE_COLORS,
    darkMode,
    fontSize: "14px",
    background: colors.background,
    primaryColor: colors.node,
    primaryBorderColor: colors.nodeBorder,
    primaryTextColor: colors.nodeText,
    secondaryColor: colors.decision,
    secondaryBorderColor: colors.decisionBorder,
    tertiaryColor: colors.group,
    tertiaryBorderColor: colors.groupBorder,
    clusterBkg: colors.group,
    clusterBorder: colors.groupBorder,
    lineColor: colors.line,
    textColor: colors.text,
    edgeLabelBackground: colors.decision,
    noteBkgColor: colors.note,
    noteBorderColor: colors.noteBorder,
    noteTextColor: colors.text,
    pieTitleTextColor: colors.text,
    pieLegendTextColor: colors.text,
    pieStrokeColor: colors.background,
    pieOuterStrokeColor: colors.background,
  },
});

export const MERMAID_CONFIGS = {
  light: getConfig(LIGHT_COLORS, false),
  dark: getConfig(DARK_COLORS, true),
} satisfies Record<string, MermaidConfig>;

type Layout = Pick<MermaidConfig, "layout"> & { rankSpacing?: number };

const FLOWCHART_LAYOUT: Layout = { layout: "elk" };

export const MERMAID_LAYOUTS: Partial<Record<string, Layout>> = {
  flowchart: FLOWCHART_LAYOUT,
  "flowchart-v2": FLOWCHART_LAYOUT,
  class: { rankSpacing: 80 },
};

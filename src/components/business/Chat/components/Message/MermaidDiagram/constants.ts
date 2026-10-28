import type { MermaidConfig } from "mermaid";

export const MERMAID_ID_PREFIX = "jonu-mermaid-";

export const MERMAID_CACHE_LIMIT = 50;

export const MERMAID_SETTLE_DELAY = 300;

export const MERMAID_LINK_TAG = '<a target="_blank" rel="noopener noreferrer" ';

const NATURAL_SIZE = { useMaxWidth: false };

const BASE_CONFIG: MermaidConfig = {
  startOnLoad: false,
  securityLevel: "strict",
  suppressErrorRendering: true,
  theme: "base",
  fontFamily: "var(--font-rubik), sans-serif",
  dompurifyConfig: { FORBID_TAGS: ["style", "img"] },
  flowchart: NATURAL_SIZE,
  sequence: NATURAL_SIZE,
  gantt: NATURAL_SIZE,
  class: NATURAL_SIZE,
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

export const MERMAID_CONFIGS = {
  light: {
    ...BASE_CONFIG,
    themeVariables: {
      ...PIE_COLORS,
      darkMode: false,
      fontSize: "14px",
      background: "#F7F7F7",
      primaryColor: "#FFFFFF",
      primaryBorderColor: "#D7D7D7",
      primaryTextColor: "#171717",
      secondaryColor: "#EFEFEF",
      tertiaryColor: "#F7F7F7",
      lineColor: "#6F6F6F",
      textColor: "#171717",
      noteBkgColor: "#EFEFEF",
      noteBorderColor: "#D7D7D7",
      noteTextColor: "#171717",
      pieTitleTextColor: "#171717",
      pieLegendTextColor: "#171717",
      pieStrokeColor: "#F7F7F7",
      pieOuterStrokeColor: "#F7F7F7",
    },
  },
  dark: {
    ...BASE_CONFIG,
    themeVariables: {
      ...PIE_COLORS,
      darkMode: true,
      fontSize: "14px",
      background: "#3B3B3B",
      primaryColor: "#0A0A0A",
      primaryBorderColor: "#545454",
      primaryTextColor: "#EDEDED",
      secondaryColor: "#2F2F2F",
      tertiaryColor: "#3B3B3B",
      lineColor: "#9C9C9C",
      textColor: "#EDEDED",
      noteBkgColor: "#2F2F2F",
      noteBorderColor: "#545454",
      noteTextColor: "#EDEDED",
      pieTitleTextColor: "#EDEDED",
      pieLegendTextColor: "#EDEDED",
      pieStrokeColor: "#3B3B3B",
      pieOuterStrokeColor: "#3B3B3B",
    },
  },
} satisfies Record<string, MermaidConfig>;

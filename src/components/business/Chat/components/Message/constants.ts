import { code } from "@streamdown/code";
import { type MathPlugin, math } from "@streamdown/math";
import remarkBreaks from "remark-breaks";
import {
  defaultRehypePlugins,
  defaultRemarkPlugins,
  type StreamdownProps,
} from "streamdown";
import type { Prompt } from "@/api";
import { AlertTitle } from "./AlertTitle";
import { AnswerImage } from "./AnswerImage";
import { MarkdownLink } from "./MarkdownLink";
import { MermaidDiagram } from "./MermaidDiagram";
import { getFootnoteBackLabel } from "./markdown";
import {
  rehypeAlerts,
  rehypeAnswerImages,
  rehypeLiteralTags,
  rehypeSafeKatex,
  remarkCollapseBreaks,
  remarkHtmlAsText,
  withDataImageSources,
} from "./plugins";
import { TableCell } from "./TableCell";

export const ERROR_MESSAGE_ID = "this-is-error-message";
export const WAITING_RESPONSE_MESSAGE_ID = "AI is typing...";
export const THINKING_MESSAGE_ID = "AI is thinking...";
export const TOO_MANY_REQUESTS_MESSAGE_ID = "too-many-requests";

export const SYSTEM_MESSAGES = [
  WAITING_RESPONSE_MESSAGE_ID,
  THINKING_MESSAGE_ID,
  TOO_MANY_REQUESTS_MESSAGE_ID,
];

export const STREAM_RENDER_INTERVAL = 50;

export const ACTION_FEEDBACK_DURATION = 3 * 1000;

export const ANIMATION: StreamdownProps["animated"] = {
  animation: "fadeIn",
  duration: 250,
  easing: "ease-out",
};

export const CONTROLS: StreamdownProps["controls"] = {
  table: { copy: true, download: true, fullscreen: false },
  code: true,
};

export const LINK_SAFETY: StreamdownProps["linkSafety"] = { enabled: false };

export const REMARK_PLUGINS: StreamdownProps["remarkPlugins"] = [
  ...Object.values(defaultRemarkPlugins),
  remarkBreaks,
  remarkCollapseBreaks,
];

export const REMARK_PLUGINS_USER: StreamdownProps["remarkPlugins"] = [
  ...Object.values(defaultRemarkPlugins),
  remarkHtmlAsText,
  remarkBreaks,
  remarkCollapseBreaks,
];

export const REMARK_PLUGINS_BY_ROLE: Record<
  Prompt["role"],
  StreamdownProps["remarkPlugins"]
> = {
  model: REMARK_PLUGINS,
  user: REMARK_PLUGINS_USER,
};

export const REHYPE_PLUGINS: StreamdownProps["rehypePlugins"] = [
  defaultRehypePlugins.raw,
  rehypeLiteralTags,
  withDataImageSources(defaultRehypePlugins.sanitize),
  rehypeAlerts,
  rehypeAnswerImages,
  defaultRehypePlugins.harden,
];

export const MATH_PLUGIN: MathPlugin = {
  ...math,
  rehypePlugin: [
    rehypeSafeKatex,
    { errorColor: "var(--color-muted-foreground)", strict: "ignore" },
  ],
};

export const PLUGINS: StreamdownProps["plugins"] = {
  math: MATH_PLUGIN,
  code,
  renderers: [{ language: "mermaid", component: MermaidDiagram }],
};

export const PLUGINS_USER: StreamdownProps["plugins"] = {
  math: MATH_PLUGIN,
  code,
};

export const PLUGINS_BY_ROLE: Record<
  Prompt["role"],
  StreamdownProps["plugins"]
> = {
  model: PLUGINS,
  user: PLUGINS_USER,
};

export const REMARK_REHYPE_OPTIONS: StreamdownProps["remarkRehypeOptions"] = {
  footnoteLabel: "Сноски",
  footnoteBackLabel: getFootnoteBackLabel,
};

export const MARKDOWN_COMPONENTS: StreamdownProps["components"] = {
  a: MarkdownLink,
  td: TableCell,
  "alert-title": AlertTitle,
  "answer-image": AnswerImage,
};

export const TRANSLATIONS: StreamdownProps["translations"] = {
  copyCode: "Скопировать код",
  downloadFile: "Скачать файл",
  copyTable: "Скопировать таблицу",
  copyTableAsMarkdown: "Скопировать как Markdown",
  copyTableAsCsv: "Скопировать как CSV",
  copyTableAsTsv: "Скопировать как TSV",
  downloadTable: "Скачать таблицу",
  downloadTableAsCsv: "Скачать как CSV",
  downloadTableAsMarkdown: "Скачать как Markdown",
  viewFullscreen: "На весь экран",
  exitFullscreen: "Свернуть",
  copied: "Скопировано",
  close: "Закрыть",
};

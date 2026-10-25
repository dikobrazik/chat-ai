import type { StreamdownProps } from "streamdown";
import { TableCell } from "./TableCell";

export const ERROR_MESSAGE_ID = "this-is-error-message";
export const WAITING_RESPONSE_MESSAGE_ID = "AI is typing...";
export const TOO_MANY_REQUESTS_MESSAGE_ID = "too-many-requests";

export const SYSTEM_MESSAGES = [
  WAITING_RESPONSE_MESSAGE_ID,
  TOO_MANY_REQUESTS_MESSAGE_ID,
];

export const ACTION_FEEDBACK_DURATION = 3 * 1000;

export const REMEND_OPTIONS: StreamdownProps["remend"] = { htmlTags: false };

export const CONTROLS: StreamdownProps["controls"] = {
  table: { copy: true, download: true, fullscreen: false },
  code: true,
};

export const LINK_SAFETY: StreamdownProps["linkSafety"] = { enabled: false };

export const MARKDOWN_COMPONENTS: StreamdownProps["components"] = {
  td: TableCell,
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

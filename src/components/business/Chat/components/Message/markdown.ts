import type { ExtraProps } from "streamdown";

type HastNode = {
  type: string;
  value?: string;
  children?: HastNode[];
};

const FENCED_CODE_PATTERN = /(```[\s\S]*?(?:```|$)|~~~[\s\S]*?(?:~~~|$))/g;

const INLINE_CODE_PATTERN = /(`[^`\n]*`)/g;

const CODE_SPAN_PATTERN = /`[^`\n]*`/g;

const UNESCAPED_PIPE_PATTERN = /(?<!\\)\|/g;

const TABLE_SEPARATOR_PATTERN =
  /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;

const DOLLAR_PATTERN =
  /\\\$|\$\$[\s\S]+?\$\$|\$(?=[^\s$])([^$\n]*?[^$\s])?\$(?!\d)|\$/g;

const DISPLAY_LINE_PATTERN = /^[ \t]*\$\$([^$\n]+)\$\$[ \t]*$/gm;

const BRACKET_DISPLAY_PATTERN = /\\\[([\s\S]+?)\\\]/g;

const BRACKET_INLINE_PATTERN = /\\\(([\s\S]+?)\\\)/g;

const LATEX_COMMAND_PATTERN = /\\[a-zA-Z]/;

const CYRILLIC_PATTERN = /[а-яё]/i;

const MATH_SIGNAL_PATTERN =
  /[\^_={}]|^[a-zA-Z]$|[a-zA-Z]\s*[+\-*/<>(!]|\d[a-zA-Z]|[α-ωΑ-Ω]/;

const getCells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/(?<!\\)\|$/, "")
    .split(UNESCAPED_PIPE_PATTERN);

const escapeCodePipes = (line: string) =>
  line.replace(CODE_SPAN_PATTERN, (span) =>
    span.replace(UNESCAPED_PIPE_PATTERN, "\\|"),
  );

const isTableHeader = (line: string, next: string) =>
  line.includes("|") &&
  next.includes("|") &&
  TABLE_SEPARATOR_PATTERN.test(next) &&
  !TABLE_SEPARATOR_PATTERN.test(line);

const isTableRow = (line: string, isPipeLed: boolean) =>
  isPipeLed ? line.trimStart().startsWith("|") : line.includes("|");

const normalizeSeparator = (separator: string, columns: number) => {
  const cells = getCells(separator).map((cell) => cell.trim());
  if (cells.length === columns) return separator;

  const indent = separator.match(/^\s*/)?.[0] ?? "";
  const normalized = Array.from(
    { length: columns },
    (_, index) => cells[index] ?? "---",
  );
  return `${indent}| ${normalized.join(" | ")} |`;
};

const normalizeTables = (text: string) => {
  const lines = text.split("\n");
  const result: string[] = [];
  let columns = 0;
  let isPipeLed = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (columns > 0) {
      if (line.trim() === "") {
        columns = 0;
        result.push(line);
        continue;
      }
      if (isTableRow(line, isPipeLed)) {
        result.push(escapeCodePipes(line));
        continue;
      }
      columns = 0;
      result.push("");
    }

    const next = lines[index + 1] ?? "";
    if (isTableHeader(line, next)) {
      const header = escapeCodePipes(line);
      columns = getCells(header).length;
      isPipeLed = line.trimStart().startsWith("|");
      result.push(header, normalizeSeparator(next, columns));
      index += 1;
      continue;
    }

    result.push(line);
  }

  return result.join("\n");
};

const isMath = (content: string) =>
  LATEX_COMMAND_PATTERN.test(content) ||
  (!CYRILLIC_PATTERN.test(content) && MATH_SIGNAL_PATTERN.test(content));

const replaceDollar = (match: string, content?: string) => {
  if (match === "\\$" || match.startsWith("$$")) return match;
  if (content === undefined || match.length < 2) return "\\$";
  return isMath(content) ? `$$${content}$$` : `\\$${content}\\$`;
};

const fixInlineMath = (text: string) =>
  text
    .replace(
      BRACKET_DISPLAY_PATTERN,
      (_, formula: string) => `\n$$\n${formula.trim()}\n$$\n`,
    )
    .replace(
      BRACKET_INLINE_PATTERN,
      (_, formula: string) => `$$${formula.trim()}$$`,
    )
    .replace(DOLLAR_PATTERN, replaceDollar);

const fixMath = (text: string) =>
  text
    .replace(
      DISPLAY_LINE_PATTERN,
      (_, formula: string) => `$$\n${formula.trim()}\n$$`,
    )
    .split(INLINE_CODE_PATTERN)
    .map((part, index) => (index % 2 === 1 ? part : fixInlineMath(part)))
    .join("");

const holdBackTableHeader = (text: string) => {
  const lines = text.split("\n");
  let start = lines.length;
  while (start > 0 && lines[start - 1].includes("|")) start -= 1;

  const tail = lines.slice(start);
  const hasSeparator = tail
    .slice(0, -1)
    .some((line) => TABLE_SEPARATOR_PATTERN.test(line));

  return tail.length === 0 || hasSeparator
    ? text
    : lines.slice(0, start).join("\n");
};

export const prepareMarkdown = (text: string, isStreaming: boolean) =>
  (isStreaming ? holdBackTableHeader(text) : text)
    .split(FENCED_CODE_PATTERN)
    .map((part, index) =>
      index % 2 === 1 ? part : fixMath(normalizeTables(part)),
    )
    .join("");

const getText = (node?: HastNode): string =>
  node?.type === "text"
    ? (node.value ?? "")
    : (node?.children ?? []).map(getText).join("");

export const hasLongToken = (node: ExtraProps["node"]) =>
  getText(node as HastNode)
    .split(/\s+/)
    .some((token) => token.length >= 24);

import type { ExtraProps } from "streamdown";
import { parseMarkdownIntoBlocks } from "streamdown";

type HastNode = {
  type: string;
  value?: string;
  children?: HastNode[];
};

type Segment = {
  text: string;
  isCode: boolean;
};

type OpenMath = {
  index: number;
  opener: string;
};

const FENCE_PATTERN =
  /^(?:[ \t]*(?:>|(?:[-*+]|\d+[.)])(?=[ \t])))*[ \t]*(`{3,}|~{3,})(.*)$/;

const QUOTE_MARKERS_PATTERN = /^[ \t]*(?:>[ \t]*)*/;

const CONTAINER_PREFIX_PATTERN =
  /^(?:[ \t]*(?:>|(?:[-*+]|\d+[.)])(?=[ \t])))*[ \t]*/;

const QUOTE_PREFIX_PATTERN = /^ {0,3}(?:>[ \t]?)+/;

const LIST_ITEM_PATTERN = /^( *)((?:[-*+]|\d+[.)])(?: {1,4}|$))/;

const BLOCK_BREAK_PATTERN = /^ {0,3}(?:#{1,6}(?:[ \t]|$)|(?:[-*_][ \t]*){3,}$)/;

const INDENTED_MATH_PATTERN = /^(?:\\\[[\s\S]*\\\]|\$\$[\s\S]*\$\$)$/;

const CODE_URL_PATTERN =
  /(?<!`)(`+)(?!`)[^\n]*?[^`\n]\1(?!`)|(?:https?:\/\/|www\.)[^\s<>()]+|<[A-Za-z][A-Za-z0-9-]*(?:\s+[A-Za-z_:][\w.:-]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*\/?>|<\/[A-Za-z][A-Za-z0-9-]*\s*>/g;

const LINK_DESTINATION_PATTERN =
  /\]\((?:\\.|[^\s()\\]|\((?:\\.|[^\s()\\])*\))*\)/g;

const PROTECTED_INLINE_PATTERN =
  /(?<!`)(`+)(?!`)[^\n]*?[^`\n]\1(?!`)|(?:https?:\/\/|www\.)[^\s<>()]+|\]\((?:\\.|[^\s()\\]|\((?:\\.|[^\s()\\])*\))*\)/g;

const CODE_SPAN_PATTERN = /`[^`\n]*`/g;

const UNESCAPED_BACKTICK_PATTERN = /(?<!\\)`/;

const UNESCAPED_PIPE_PATTERN = /(?<!\\)\|/g;

const CELL_PIPE_PATTERN = /(?<![\\<])\|(?!>)/g;

const TABLE_SEPARATOR_PATTERN =
  /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;

const TABLE_SEPARATOR_DRAFT_PATTERN = /^[ \t]*(?:\||:?-)[\s|:-]*$/;

const TABLE_CELL_END_PATTERN = /\|[ \t]*$/;

const DOLLAR_PATTERN =
  /\\\$|\$\$[\s\S]+?\$\$|\$(?=[^\s$])([^$\n]*?[^$\s])?\$(?!\d)|\$/g;

const DISPLAY_DOLLAR_LINE_PATTERN = /^([ \t]*)\$\$([^$\n]+)\$\$[ \t]*$/gm;

const BRACKET_DISPLAY_PATTERN =
  /^(?![ \t]*\|)([ \t]*(?:>[ \t]?)*(?:(?:[-*+]|\d+[.)])[ \t]+)?)(.*?)([ \t]*)(?<!\\)\\\[((?:(?!(?<!\\)\\[[\]])[\s\S])+?)(?<!\\)\\\]([^\n]*)$/gm;

const TRAILING_PUNCTUATION_PATTERN = /^([.,;:!?…]*)[ \t]*(.*)$/;

const LIST_MARKER_TAIL_PATTERN = /(?:[-*+]|\d+[.)])[ \t]+$/;

const BRACKET_INLINE_PATTERN =
  /(?<!\\)\\\[((?:(?!(?<!\\)\\[[\]])[^\n])+?)(?<!\\)\\\]/g;

const PAREN_INLINE_PATTERN =
  /(?<!\\)\\\(((?:(?!(?<!\\)\\[()])[^\n])+?)(?<!\\)\\\)/g;

const GLUED_PAREN_PATTERN = /[\p{L}\p{N}]/u;

const GLUED_SQUARE_PATTERN = /[\p{L}\p{N}\])]/u;

const WORD_CHAR_PATTERN = /[\p{L}\p{N}]/u;

const DISPLAY_MATH_SPAN_PATTERN = /\$\$[\s\S]*?\$\$/g;

const OPEN_BRACKET_PATTERN =
  /(?<!\\)\\\[(?![\s\S]*(?<!\\)\\\])|(?<!\\)\\\((?![\s\S]*(?<!\\)\\\))/;

const DISPLAY_DOLLAR_PATTERN = /(?<![\\$])\$\$(?!\$)/g;

const OPEN_FORMULA_TAIL_PATTERN = /(?:\\+|(?<!\\)\$)$/;

const LATEX_COMMAND_PATTERN = /\\(?:[a-zA-Z]|[|{},;!%])/;

const LATEX_GROUP_PATTERN = /\\[a-zA-Z]+\{[^{}]*\}|[_^]\{[^{}]*\}|[_^][а-яё]/g;

const LOWERCASE_CYRILLIC_PATTERN = /[а-яё]/;

const CURRENCY_PATTERN = /[₽€£¥]/;

const PROSE_MATH_SIGN_PATTERN = /[=^_<>]/;

const SQUARE_MATH_SIGN_PATTERN = /[=<>≤≥≠≈^]/;

const SUBSCRIPT_START_PATTERN = /^\s*[\^_]/;

const MATH_OPERATOR_PATTERN =
  /[=+\-*/^_<>≤≥≠≈±×÷·→←⇒⇔∧∨¬≡⊆⊂∈∉∪∩∞∑∏∫√∂∇°'!|α-ωΑ-Ω]/;

const MATH_TERM_PATTERN =
  /^[-−+±]?(?:\d+(?:[.,]\d+)?)?\s*[A-Za-zА-ЯЁα-ωΑ-Ω]{0,8}'*\s*[₽€£¥%°]?$/;

const DECIMAL_COMMA_PATTERN = /\{,\}/g;

const MATH_FUNCTION_PATTERN = /^[A-Za-z]{1,6}'*\(.*\)$|^[[(].*[,;].*[\])]$/;

const TERM_SEPARATOR_PATTERN = /\s*[,:;]\s*/;

const TRAILING_OPERATOR_PATTERN = /(?<![\^_])[+\-*/=<>,;:]$/;

const DIGITS_PATTERN = /^\d+$/;

const PERCENT_PATTERN = /(?<!\\)%/g;

const COMPARISON_PATTERN = /^ {0,3}>(?:=|[−-]?\d)/;

const QUOTE_LINE_PATTERN = /^ {0,3}>/;

const INCOMPLETE_TAG_TAIL_PATTERN =
  /<\/?(?:[A-Za-z][\w:-]*(?:\s+[\w:-]+(?:=(?:"[^"\n]*"?|'[^'\n]*'?|[^\s"'<>]*))?)*\s*)?$/;

const REFERENCE_DEFINITION_PATTERN = /^ {0,3}\[[^\]^\n][^\]\n]*\]:[ \t]*\S/m;

const NAMED_DEFINITION_PATTERN =
  /^ {0,3}\[(?!\^)[^\]\n]*[^\]\d\n][^\]\n]*\]:[ \t]*\S/m;

const FULL_REFERENCE_PATTERN = /\[[^\]\n]*[^\]\d\n][^\]\n]*\]\[[^\]\n]*\]/;

const INCOMPLETE_LINK_HREF = "streamdown:incomplete-link";

const toColumns = (line: string) => line.replace(/\t/g, "    ");

const getIndent = (line: string) =>
  toColumns(line).match(/^ */)?.[0].length ?? 0;

const stripQuote = (line: string) => line.replace(QUOTE_PREFIX_PATTERN, "");

const getFenceMarker = (line: string) => {
  const [, marker = "", info = ""] = line.match(FENCE_PATTERN) ?? [];
  return marker.startsWith("`") && info.includes("`") ? "" : marker;
};

const getQuoteDepth = (line: string) =>
  line.match(CONTAINER_PREFIX_PATTERN)?.[0].split(">").length ?? 1;

const isClosingFence = (line: string, fence: string, depth: number) => {
  const marker = line.replace(CONTAINER_PREFIX_PATTERN, "").trim();
  return (
    getQuoteDepth(line) === depth &&
    marker.length >= fence.length &&
    marker === fence[0].repeat(marker.length)
  );
};

const updateListIndents = (
  body: string,
  indents: number[],
  previous: string,
) => {
  if (!body.trim()) return indents;
  const item = toColumns(body).match(LIST_ITEM_PATTERN);
  if (!item && previous.trim()) return indents;
  const indent = getIndent(body);
  const nested = indents.filter((value) => value <= indent);
  return item ? [...nested, item[1].length + item[2].length] : nested;
};

const canStartIndentedCode = (previous: string) =>
  !previous.trim() || BLOCK_BREAK_PATTERN.test(previous);

const isIndentedCodeLine = (body: string, threshold: number) =>
  Boolean(body.trim()) && getIndent(body) >= threshold;

const isIndentedMath = (lines: string[]) =>
  INDENTED_MATH_PATTERN.test(lines.join("\n").trim());

const pushSegment = (segments: Segment[], lines: string[], isCode: boolean) => {
  if (lines.length > 0) segments.push({ text: lines.join("\n"), isCode });
};

const pushIndentedSegment = (segments: Segment[], lines: string[]) => {
  if (isIndentedMath(lines)) {
    pushSegment(
      segments,
      lines.map((line) => line.trimStart()),
      false,
    );
  } else {
    pushSegment(segments, lines, true);
  }
};

const splitCodeSegments = (text: string) => {
  const segments: Segment[] = [];
  let lines: string[] = [];
  let fence = "";
  let fenceDepth = 1;
  let codeIndent = 0;
  let listIndents: number[] = [];
  let previous = "";

  for (const line of text.split("\n")) {
    const body = stripQuote(line);

    if (fence) {
      lines.push(line);
      if (isClosingFence(line, fence, fenceDepth)) {
        pushSegment(segments, lines, true);
        lines = [];
        fence = "";
        previous = "";
      }
      continue;
    }

    if (codeIndent && (isIndentedCodeLine(body, codeIndent) || !body.trim())) {
      lines.push(line);
      previous = body;
      continue;
    }

    if (codeIndent) {
      pushIndentedSegment(segments, lines);
      lines = [];
      codeIndent = 0;
    }

    fence = getFenceMarker(line);
    fenceDepth = getQuoteDepth(line);
    const threshold = (listIndents.at(-1) ?? 0) + 4;
    if (
      !fence &&
      canStartIndentedCode(previous) &&
      isIndentedCodeLine(body, threshold)
    ) {
      codeIndent = threshold;
    }

    if (fence || codeIndent) {
      pushSegment(segments, lines, false);
      lines = [];
    } else {
      listIndents = updateListIndents(body, listIndents, previous);
    }

    lines.push(line);
    previous = body;
  }

  if (codeIndent) {
    pushIndentedSegment(segments, lines);
  } else {
    pushSegment(segments, lines, Boolean(fence));
  }
  return segments;
};

const mapUnprotected = (
  text: string,
  pattern: RegExp,
  transform: (part: string) => string,
) => {
  let result = "";
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    result += transform(text.slice(lastIndex, match.index)) + match[0];
    lastIndex = match.index + match[0].length;
  }
  return result + transform(text.slice(lastIndex));
};

const maskProtected = (text: string) =>
  text.replace(PROTECTED_INLINE_PATTERN, (match) => " ".repeat(match.length));

const getProtectedRanges = (text: string) =>
  [...text.matchAll(CODE_URL_PATTERN)].map((match) => [
    match.index,
    match.index + match[0].length,
  ]);

const isProtectedIndex = (ranges: number[][], index: number) =>
  ranges.some(([start, end]) => index >= start && index < end);

const findOpenInlineCode = (text: string) => {
  const masked = maskProtected(text);
  const lineStart = masked.lastIndexOf("\n") + 1;
  const tick = masked.slice(lineStart).search(UNESCAPED_BACKTICK_PATTERN);
  return tick < 0 ? -1 : lineStart + tick;
};

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

const hasProseText = (content: string) =>
  LOWERCASE_CYRILLIC_PATTERN.test(content.replace(LATEX_GROUP_PATTERN, ""));

const isPadded = (content: string) =>
  /^\s/.test(content) && /\s$/.test(content);

const isPaddedMath = (content: string) =>
  !hasProseText(content) || PROSE_MATH_SIGN_PATTERN.test(content);

const isParenMath = (content: string, isGlued: boolean) => {
  if (!content.trim()) return false;
  if (LATEX_COMMAND_PATTERN.test(content)) return true;
  if (isGlued) return SUBSCRIPT_START_PATTERN.test(content);
  if (isPadded(content)) return isPaddedMath(content);
  return !hasProseText(content) && !CURRENCY_PATTERN.test(content);
};

const isMathTerm = (value: string) =>
  value
    .replace(DECIMAL_COMMA_PATTERN, ".")
    .split(TERM_SEPARATOR_PATTERN)
    .every((part) => Boolean(part) && MATH_TERM_PATTERN.test(part));

const isMathLike = (content: string) => {
  const value = content.trim();
  return (
    isMathTerm(value) ||
    MATH_FUNCTION_PATTERN.test(value) ||
    (!TRAILING_OPERATOR_PATTERN.test(value) &&
      MATH_OPERATOR_PATTERN.test(value))
  );
};

const isSquareMath = (content: string, isGlued = false) => {
  if (!content.trim() || isGlued || SUBSCRIPT_START_PATTERN.test(content)) {
    return false;
  }
  if (LATEX_COMMAND_PATTERN.test(content)) return true;
  if (isPadded(content)) return isPaddedMath(content);
  return (
    !hasProseText(content) &&
    !CURRENCY_PATTERN.test(content) &&
    SQUARE_MATH_SIGN_PATTERN.test(content)
  );
};

const isDollarMath = (content: string) =>
  LATEX_COMMAND_PATTERN.test(content) ||
  (!hasProseText(content) && isMathLike(content));

const isGluedDollarMath = (content: string) =>
  LATEX_COMMAND_PATTERN.test(content) || SUBSCRIPT_START_PATTERN.test(content);

const isStandaloneSquareMath = (content: string) =>
  isSquareMath(content) ||
  (!hasProseText(content) &&
    !CURRENCY_PATTERN.test(content) &&
    !DIGITS_PATTERN.test(content.trim()) &&
    isMathLike(content));

const escapePercent = (formula: string) =>
  formula.replace(PERCENT_PATTERN, "\\%");

const toMathBlock = (indent: string, formula: string) =>
  ["$$", ...escapePercent(formula.trim()).split("\n"), "$$"]
    .map((line) => `${indent}${line.trim()}`)
    .join("\n");

const toInlineMath = (formula: string) =>
  `$$${escapePercent(formula.trim().replace(/\s*\n\s*/g, " "))}$$`;

const toBlockIndent = (lead: string) =>
  lead.replace(LIST_MARKER_TAIL_PATTERN, (marker) => " ".repeat(marker.length));

const stripFormulaQuotes = (formula: string, lead: string) =>
  lead.includes(">") ? formula.replace(/^[ \t]*(?:>[ \t]?)*/gm, "") : formula;

const replaceDisplayLine = (_: string, indent: string, formula: string) =>
  toMathBlock(indent, formula);

const isInlineContext = (text: string, gap: string) =>
  TABLE_CELL_END_PATTERN.test(text) ||
  (!gap && GLUED_SQUARE_PATTERN.test(text.slice(-1)));

const toDisplayBracket = (
  match: string,
  lead: string,
  text: string,
  gap: string,
  formula: string,
  rest: string,
) => {
  const [, punctuation = "", remainder = ""] =
    rest.match(TRAILING_PUNCTUATION_PATTERN) ?? [];
  const isMultiline = formula.includes("\n");
  if (remainder && !isMultiline) return match;
  if (text && isInlineContext(text, gap)) return match;
  const isFormula = text
    ? isSquareMath(formula)
    : isStandaloneSquareMath(formula);
  if (!isMultiline && !isFormula) return match;

  const indent = toBlockIndent(lead);
  const block = toMathBlock(
    indent,
    `${stripFormulaQuotes(formula, lead).trim()}${punctuation}`,
  );
  const head = text
    ? `${lead}${text}\n${block}`
    : `${lead}${block.slice(indent.length)}`;
  return remainder ? `${head}\n${indent}${remainder}` : head;
};

const fixDisplayBrackets = (text: string) => {
  const ranges = getProtectedRanges(text);
  return text.replace(
    BRACKET_DISPLAY_PATTERN,
    (
      match: string,
      lead: string,
      before: string,
      gap: string,
      formula: string,
      rest: string,
      offset: number,
    ) => {
      const opener = offset + lead.length + before.length + gap.length;
      const closer = offset + match.length - rest.length - 1;
      return isProtectedIndex(ranges, opener) ||
        isProtectedIndex(ranges, closer)
        ? match
        : toDisplayBracket(match, lead, before, gap, formula, rest);
    },
  );
};

const replaceSquareInline = (
  match: string,
  formula: string,
  offset: number,
  text: string,
) =>
  isSquareMath(formula, GLUED_SQUARE_PATTERN.test(text[offset - 1] ?? ""))
    ? toInlineMath(formula)
    : match;

const replaceParenInline = (
  match: string,
  formula: string,
  offset: number,
  text: string,
) =>
  isParenMath(formula, GLUED_PAREN_PATTERN.test(text[offset - 1] ?? ""))
    ? toInlineMath(formula)
    : match;

const replaceDollar = (
  match: string,
  content: string | undefined,
  offset: number,
  text: string,
) => {
  if (match === "\\$" || match.startsWith("$$")) return match;
  if (content === undefined || match.length < 2) return "\\$";
  const isGlued = WORD_CHAR_PATTERN.test(text[offset - 1] ?? "");
  return (isGlued ? isGluedDollarMath(content) : isDollarMath(content))
    ? `$$${escapePercent(content)}$$`
    : `\\$${content}\\$`;
};

const isQuoteLine = (line = "") =>
  QUOTE_LINE_PATTERN.test(line) && !COMPARISON_PATTERN.test(line);

const escapeComparisons = (text: string) =>
  text
    .split("\n")
    .map((line, index, lines) =>
      COMPARISON_PATTERN.test(line) &&
      !isQuoteLine(lines[index - 1]) &&
      !isQuoteLine(lines[index + 1])
        ? line.replace(">", "\\>")
        : line,
    )
    .join("\n");

const fixInlineBrackets = (text: string) =>
  text
    .replace(BRACKET_INLINE_PATTERN, replaceSquareInline)
    .replace(PAREN_INLINE_PATTERN, replaceParenInline);

const fixInlineMath = (text: string) =>
  mapUnprotected(
    mapUnprotected(text, LINK_DESTINATION_PATTERN, fixInlineBrackets),
    DISPLAY_MATH_SPAN_PATTERN,
    (part) => part.replace(DOLLAR_PATTERN, replaceDollar),
  );

const fixMath = (text: string) =>
  mapUnprotected(
    fixDisplayBrackets(
      text.replace(DISPLAY_DOLLAR_LINE_PATTERN, replaceDisplayLine),
    ),
    CODE_URL_PATTERN,
    fixInlineMath,
  );

const prepareText = (text: string) =>
  fixMath(escapeComparisons(normalizeTables(text)));

const isPipeLed = (line = "") => line.trimStart().startsWith("|");

const countCellPipes = (line: string) =>
  line.replace(CODE_SPAN_PATTERN, "").match(CELL_PIPE_PATTERN)?.length ?? 0;

const hasShortCells = (line: string) =>
  getCells(line).every((cell) => cell.trim().length <= 60);

const isHeaderLine = (line = "", previous = "") =>
  isPipeLed(line) &&
  hasShortCells(line) &&
  !isPipeLed(previous) &&
  !TABLE_SEPARATOR_PATTERN.test(previous);

const isHeaderBeforeSeparator = (line = "", previous = "") =>
  countCellPipes(line) > 0 &&
  hasShortCells(line) &&
  (!previous.trim() || isHeaderLine(line, previous));

const findTableHeaderDraft = (lines: string[]) => {
  const last = lines.length - 1;
  if (
    TABLE_SEPARATOR_DRAFT_PATTERN.test(lines[last]) &&
    isHeaderBeforeSeparator(lines[last - 1], lines[last - 2])
  ) {
    return last - 1;
  }
  if (!lines[last].trim() && isHeaderLine(lines[last - 1], lines[last - 2])) {
    return last - 1;
  }
  return isHeaderLine(lines[last], lines[last - 1]) ? last : -1;
};

const holdBackTableHeader = (text: string) => {
  const lines = text.split("\n");
  const header = findTableHeaderDraft(lines);
  return header < 0 ? text : lines.slice(0, header).join("\n");
};

const findOpenMath = (text: string) => {
  const masked = maskProtected(text);
  const bracket = masked.match(OPEN_BRACKET_PATTERN);
  const dollars = [...masked.matchAll(DISPLAY_DOLLAR_PATTERN)];
  const dollar = dollars.length % 2 === 1 ? dollars.at(-1) : undefined;

  return [
    bracket && { index: bracket.index ?? 0, opener: bracket[0] },
    dollar && { index: dollar.index, opener: "$$" },
  ]
    .filter((candidate): candidate is OpenMath => Boolean(candidate))
    .sort((first, second) => first.index - second.index)[0];
};

const getOpenFormula = (text: string, open: OpenMath) =>
  text
    .slice(open.index + open.opener.length)
    .replace(OPEN_FORMULA_TAIL_PATTERN, "");

const getLineStart = (text: string, index: number) =>
  text.lastIndexOf("\n", index) + 1;

const getOpenerLead = (text: string, open: OpenMath) =>
  text.slice(getLineStart(text, open.index), open.index);

const isBlockOpener = (text: string, open: OpenMath) =>
  open.opener !== "\\(" &&
  !getOpenerLead(text, open).replace(QUOTE_MARKERS_PATTERN, "").trim();

const isOpenFormula = (text: string, open: OpenMath) => {
  const formula = getOpenFormula(text, open);
  const isGlued = GLUED_PAREN_PATTERN.test(text[open.index - 1] ?? "");
  if (!formula.trim() || isBlockOpener(text, open)) return true;
  if (open.opener === "\\(") return isParenMath(formula, isGlued);
  if (open.opener === "$$") return /^\S/.test(formula) && isDollarMath(formula);
  return isSquareMath(formula, isGlued);
};

const closeOpenMath = (text: string, open: OpenMath) => {
  const lineStart = getLineStart(text, open.index);
  const lead = getOpenerLead(text, open);
  const formula = getOpenFormula(text, open);

  if (!formula.trim()) {
    return prepareText(text.slice(0, open.index));
  }
  if (isBlockOpener(text, open)) {
    return `${prepareText(text.slice(0, lineStart))}${toMathBlock(lead, stripFormulaQuotes(formula, lead))}`;
  }
  return `${prepareText(text.slice(0, open.index))}${toInlineMath(formula)}`;
};

const prepareMathTail = (text: string) => {
  const tail = text.replace(INCOMPLETE_TAG_TAIL_PATTERN, "");
  const open = findOpenMath(tail);
  return open && isOpenFormula(tail, open)
    ? closeOpenMath(tail, open)
    : prepareText(tail);
};

const prepareStreamingTail = (part: string) => {
  const text = holdBackTableHeader(part);
  const codeStart = findOpenInlineCode(text);
  return codeStart < 0
    ? prepareMathTail(text)
    : `${prepareText(text.slice(0, codeStart))}${text.slice(codeStart)}`;
};

export const prepareMarkdown = (text: string, isStreaming: boolean) => {
  const segments = splitCodeSegments(text);

  return segments
    .map((segment, index) => {
      if (segment.isCode) return segment.text;
      return isStreaming && index === segments.length - 1
        ? prepareStreamingTail(segment.text)
        : prepareText(segment.text);
    })
    .join("\n");
};

export const splitMarkdownIntoBlocks = (markdown: string) =>
  REFERENCE_DEFINITION_PATTERN.test(markdown) &&
  (NAMED_DEFINITION_PATTERN.test(markdown) ||
    FULL_REFERENCE_PATTERN.test(markdown))
    ? [markdown]
    : parseMarkdownIntoBlocks(markdown);

export const isIncompleteLink = (href?: string) =>
  href === INCOMPLETE_LINK_HREF;

export const isAnchorLink = (href?: string) => Boolean(href?.startsWith("#"));

const getText = (node?: HastNode): string =>
  node?.type === "text"
    ? (node.value ?? "")
    : (node?.children ?? []).map(getText).join("");

export const hasLongToken = (node: ExtraProps["node"]) =>
  getText(node as HastNode)
    .split(/\s+/)
    .some((token) => token.length >= 24);

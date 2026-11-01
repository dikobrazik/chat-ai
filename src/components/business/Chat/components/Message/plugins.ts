import rehypeKatex, { type Options as KatexOptions } from "rehype-katex";
import type { StreamdownProps } from "streamdown";
import { isIncompleteLink } from "./markdown";

type Position = {
  start: { offset?: number };
  end: { offset?: number };
};

type TreeNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: TreeNode[];
  position?: Position;
};

export type AlertType = "note" | "tip" | "important" | "warning" | "caution";

type SourceFile = {
  value: unknown;
};

type TagSource = {
  text: string;
  end: number;
};

const HTML_TAG_NAMES = new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "circle",
  "cite",
  "clippath",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "defs",
  "del",
  "desc",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "ellipse",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "filter",
  "font",
  "footer",
  "foreignobject",
  "form",
  "g",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "image",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "line",
  "lineargradient",
  "link",
  "main",
  "map",
  "mark",
  "marker",
  "mask",
  "math",
  "menu",
  "meta",
  "meter",
  "nav",
  "nobr",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "path",
  "pattern",
  "picture",
  "polygon",
  "polyline",
  "pre",
  "progress",
  "q",
  "radialgradient",
  "rect",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "stop",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "symbol",
  "table",
  "tbody",
  "td",
  "template",
  "text",
  "textarea",
  "textpath",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tspan",
  "tt",
  "u",
  "ul",
  "use",
  "var",
  "video",
  "wbr",
]);

const WRAPPER_TAG_PATTERN =
  /^(?:think|thinking|thought|thoughts|answer|final|reasoning|reflection|result|response|artifact|antartifact|solution|analysis|scratchpad|plan|context|argument)$/;

const SERVICE_TAG_PATTERN =
  /^(?:eos|bos|pad|unk|sep|cls|mask|ctrl\d+|unused\d+)$/;

const CLOSING_TAG_MAX_PADDING = 64;

const BREAK_TAG_PATTERN = /^<\/?br\s*\/?>$/i;

const ATTRIBUTES_SOURCE =
  "(?:\\s+[^\\s\"'=<>`/]+(?:\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s\"'=<>`]+))?)*\\s*\\/?>";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findOpeningTag = (
  name: string,
  source: string,
  from: number,
): TagSource | undefined => {
  const pattern = new RegExp(
    `<${escapeRegExp(name)}(?=[\\s/>])${ATTRIBUTES_SOURCE}`,
    "gi",
  );
  pattern.lastIndex = from;
  const match = pattern.exec(source);
  return match
    ? { text: match[0], end: match.index + match[0].length }
    : undefined;
};

const findOwnClosingTag = (
  node: TreeNode,
  source: string,
  used: Set<number>,
) => {
  const end = node.position?.end.offset ?? 0;
  const name = node.tagName ?? "";
  const match = source
    .slice(Math.max(0, end - name.length - CLOSING_TAG_MAX_PADDING), end)
    .match(new RegExp(`</${escapeRegExp(name)}\\s*>$`, "i"));
  if (!match || used.has(end)) return "";
  used.add(end);
  return match[0];
};

const isWrapperTag = (name: string, opening: TagSource, source: string) =>
  WRAPPER_TAG_PATTERN.test(name) ||
  (source.startsWith("\n", opening.end) &&
    new RegExp(`</${escapeRegExp(name)}\\s*>`, "i").test(
      source.slice(opening.end),
    ));

const toText = (value: string): TreeNode[] =>
  value ? [{ type: "text", value }] : [];

const toLiteral = (node: TreeNode, source: string, used: Set<number>) => {
  const name = node.tagName ?? "";
  const children = node.children ?? [];
  if (SERVICE_TAG_PATTERN.test(name)) return children;
  const opening = findOpeningTag(
    name,
    source,
    node.position?.start.offset ?? 0,
  );
  if (!opening) return [...toText(`<${name}>`), ...children];
  if (isWrapperTag(name, opening, source)) return children;
  return [
    ...toText(opening.text),
    ...children,
    ...toText(findOwnClosingTag(node, source, used)),
  ];
};

const isLiteralTag = (node: TreeNode) =>
  node.type === "element" &&
  !HTML_TAG_NAMES.has(node.tagName?.toLowerCase() ?? "");

const replaceLiteralTags = (
  node: TreeNode,
  source: string,
  used: Set<number>,
) => {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    replaceLiteralTags(child, source, used);
    return isLiteralTag(child) ? toLiteral(child, source, used) : [child];
  });
};

const isBreakTag = (node?: TreeNode): boolean =>
  (node?.type === "html" && BREAK_TAG_PATTERN.test(node.value?.trim() ?? "")) ||
  Boolean(node?.children && isBreakTag(node.children.at(-1)));

const isDuplicateBreak = (
  node: TreeNode,
  index: number,
  siblings: TreeNode[],
) =>
  node.type === "break" &&
  !node.position &&
  (isBreakTag(siblings[index - 1]) || isBreakTag(siblings[index + 1]));

const collapseBreaks = (node: TreeNode) => {
  if (!node.children) return;
  node.children.forEach(collapseBreaks);
  node.children = node.children.filter(
    (child, index, siblings) => !isDuplicateBreak(child, index, siblings),
  );
};

export const remarkCollapseBreaks = () => (tree: TreeNode) => {
  collapseBreaks(tree);
};

export const rehypeLiteralTags = () => (tree: TreeNode, file: SourceFile) => {
  replaceLiteralTags(tree, String(file.value), new Set());
};

const FLOW_PARENT_TYPES = new Set([
  "root",
  "blockquote",
  "listItem",
  "footnoteDefinition",
]);

const htmlToText = (node: TreeNode) => {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    htmlToText(child);
    if (child.type !== "html") return child;
    const text = { type: "text", value: child.value ?? "" };
    return FLOW_PARENT_TYPES.has(node.type)
      ? { type: "paragraph", children: [text] }
      : text;
  });
};

export const remarkHtmlAsText = () => (tree: TreeNode) => {
  htmlToText(tree);
};

export const rehypeSafeKatex = (options: KatexOptions) => {
  const transform = rehypeKatex(options);
  return (...args: Parameters<typeof transform>) => {
    try {
      transform(...args);
    } catch {
      return;
    }
  };
};

const ALERT_TYPES: Record<string, AlertType> = {
  note: "note",
  info: "note",
  tip: "tip",
  hint: "tip",
  important: "important",
  warning: "warning",
  warn: "warning",
  attention: "warning",
  caution: "caution",
  danger: "caution",
  error: "caution",
};

const ALERT_MARKER_PATTERN = /^\[!([A-Za-z]+)\][+-]?(?=\s|$)\s*/;

const ALERT_DRAFT_PATTERN = /^![A-Za-z]*$/;

const toAlertType = (name: string): AlertType =>
  ALERT_TYPES[name.toLowerCase()] ?? "note";

const isElement = (node: TreeNode | undefined, tagName: string) =>
  node?.type === "element" && node.tagName === tagName;

const isBlank = (node: TreeNode) => node.type === "text" && !node.value?.trim();

const getAlertMarker = (node?: TreeNode) =>
  node?.type === "text" ? node.value?.match(ALERT_MARKER_PATTERN) : undefined;

const isAlertDraft = (node?: TreeNode) =>
  isElement(node, "a") &&
  isIncompleteLink(String(node?.properties?.href)) &&
  ALERT_DRAFT_PATTERN.test(node?.children?.[0]?.value ?? "");

const getDraftAlertType = (node?: TreeNode) => {
  const name = node?.children?.[0]?.value?.slice(1).toLowerCase();
  if (!name) return undefined;
  const types = new Set(
    Object.entries(ALERT_TYPES)
      .filter(([key]) => key.startsWith(name))
      .map(([, type]) => type),
  );
  return types.size === 1 ? [...types][0] : undefined;
};

const trimLeadingBreak = (nodes: TreeNode[]): TreeNode[] => {
  const [first, ...rest] = nodes;
  if (first && isBlank(first)) return trimLeadingBreak(rest);
  if (!isElement(first, "br")) return nodes;
  const [next, ...tail] = rest;
  return next?.type === "text"
    ? [{ ...next, value: next.value?.trimStart() }, ...tail]
    : rest;
};

const toAlertTitle = (type: AlertType): TreeNode => ({
  type: "element",
  tagName: "alert-title",
  properties: { dataAlert: type },
  children: [],
});

const markAlert = (blockquote: TreeNode) => {
  const paragraph = blockquote.children?.find((child) => !isBlank(child));
  if (!paragraph || !isElement(paragraph, "p")) return;
  const [head, ...rest] = paragraph.children ?? [];
  const marker = getAlertMarker(head);
  if (!marker && !isAlertDraft(head)) return;
  paragraph.children = trimLeadingBreak(
    marker
      ? [{ ...head, value: head.value?.slice(marker[0].length) }, ...rest]
      : rest,
  );
  blockquote.children = blockquote.children?.filter(
    (child) => child !== paragraph || paragraph.children?.length,
  );
  const type = marker
    ? ALERT_TYPES[marker[1].toLowerCase()]
    : getDraftAlertType(head);
  if (!marker && !type) return;
  blockquote.properties = {
    ...blockquote.properties,
    dataAlert: type ?? "note",
  };
  if (!type) return;
  blockquote.children = [toAlertTitle(type), ...(blockquote.children ?? [])];
};

const markAlerts = (node: TreeNode) => {
  node.children?.forEach(markAlerts);
  if (isElement(node, "blockquote")) markAlert(node);
};

export const rehypeAlerts = () => (tree: TreeNode) => {
  markAlerts(tree);
};

export const getAlertType = (node?: TreeNode) =>
  toAlertType(String(node?.properties?.dataAlert));

const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

const DATA_IMAGE_PATTERN =
  /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i;

const parseHttpUrl = (value: unknown) => {
  try {
    const url = new URL(String(value));
    return HTTP_PROTOCOLS.has(url.protocol) ? url : undefined;
  } catch {
    return undefined;
  }
};

const hasImage = (node: TreeNode): boolean =>
  isElement(node, "img") || Boolean(node.children?.some(hasImage));

const hasContent = (node: TreeNode): boolean =>
  Boolean(node.value?.trim()) ||
  isElement(node, "answer-image") ||
  Boolean(node.children?.some(hasContent));

const getAlt = (node: TreeNode) => String(node.properties?.alt ?? "").trim();

const toAnswerImage = (
  node: TreeNode,
  properties: Record<string, unknown>,
): TreeNode => ({
  type: "element",
  tagName: "answer-image",
  properties: {
    src: node.properties?.src,
    alt: getAlt(node),
    title: node.properties?.title,
    ...properties,
  },
  children: [],
});

const replaceImage = (node: TreeNode, linkHref?: unknown) => {
  const src = String(node.properties?.src ?? "");
  const url = parseHttpUrl(src);
  const isInLink = linkHref !== undefined;
  if (url && !isInLink) {
    return [
      toAnswerImage(node, {
        href: url.href,
        caption: getAlt(node) || url.hostname,
      }),
    ];
  }
  if (url || DATA_IMAGE_PATTERN.test(src)) {
    return [
      toAnswerImage(node, {
        fallback: getAlt(node) || parseHttpUrl(linkHref)?.hostname || "",
      }),
    ];
  }
  return toText(getAlt(node));
};

const replaceImages = (node: TreeNode, linkHref?: unknown): TreeNode[] => {
  if (isElement(node, "img")) return replaceImage(node, linkHref);
  if (!node.children) return [node];
  const isLink = isElement(node, "a");
  const href = isLink ? (node.properties?.href ?? "") : linkHref;
  const hadImage = isLink && node.children.some(hasImage);
  node.children = node.children.flatMap((child) => replaceImages(child, href));
  if (hadImage && !hasContent(node)) {
    node.children = toText(
      parseHttpUrl(node.properties?.href)?.hostname ??
        String(node.properties?.href ?? ""),
    );
  }
  return [node];
};

export const rehypeAnswerImages = () => (tree: TreeNode) => {
  replaceImages(tree);
};

type RehypePlugin = NonNullable<StreamdownProps["rehypePlugins"]>[number];

type RehypePluginTuple = Extract<RehypePlugin, unknown[]>;

export const withDataImageSources = (sanitize: RehypePlugin): RehypePlugin => {
  const [plugin, schema] = sanitize as RehypePluginTuple;
  return [
    plugin,
    {
      ...schema,
      protocols: {
        ...schema.protocols,
        src: [...schema.protocols.src, "data"],
      },
    },
  ];
};

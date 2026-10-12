type Position = {
  start: { offset?: number };
  end: { offset?: number };
};

type TreeNode = {
  type: string;
  tagName?: string;
  value?: string;
  children?: TreeNode[];
  position?: Position;
};

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
  const match = source
    .slice(0, end)
    .match(new RegExp(`</${escapeRegExp(node.tagName ?? "")}\\s*>$`, "i"));
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

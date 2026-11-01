import {
  MERMAID_CACHE_LIMIT,
  MERMAID_CONFIGS,
  MERMAID_FLOWCHART_TYPES,
  MERMAID_ID_PREFIX,
  MERMAID_LAYOUTS,
  MERMAID_LINK_TAG,
} from "./constants";
import { toRoundedDecisions } from "./flowchart";
import { decorateSvg } from "./svg";

export type MermaidScheme = keyof typeof MERMAID_CONFIGS;

type Mermaid = typeof import("mermaid")["default"];

let mermaidModule: Promise<typeof import("mermaid")> | undefined;
let renderQueue: Promise<unknown> = Promise.resolve();
let renderCount = 0;
const readySvgs = new Map<string, string>();
const pendingSvgs = new Map<string, Promise<string>>();

const toCacheKey = (code: string, scheme: MermaidScheme) =>
  `${scheme}\n${code}`;

const loadMermaid = () => {
  mermaidModule ??= import("mermaid").catch((error) => {
    mermaidModule = undefined;
    throw error;
  });
  return mermaidModule;
};

const getDiagramType = (mermaid: Mermaid, code: string) => {
  try {
    return mermaid.detectType(code);
  } catch {
    return undefined;
  }
};

const getLayoutConfig = (scheme: MermaidScheme, type: string) => {
  const layout = MERMAID_LAYOUTS[type];
  return layout && { ...MERMAID_CONFIGS[scheme], ...layout };
};

const renderCode = async (mermaid: Mermaid, code: string) => {
  renderCount += 1;
  const { svg } = await mermaid.render(
    `${MERMAID_ID_PREFIX}${renderCount}`,
    code,
  );
  return svg;
};

const renderFlowchart = (mermaid: Mermaid, code: string) => {
  const roundedCode = toRoundedDecisions(code);
  if (roundedCode === code) return renderCode(mermaid, code);
  return renderCode(mermaid, roundedCode).catch(() =>
    renderCode(mermaid, code),
  );
};

const renderSvg = async (code: string, scheme: MermaidScheme) => {
  const { default: mermaid } = await loadMermaid();
  mermaid.initialize(MERMAID_CONFIGS[scheme]);
  const type = getDiagramType(mermaid, code) ?? "";
  const layoutConfig = getLayoutConfig(scheme, type);
  if (layoutConfig) mermaid.initialize(layoutConfig);
  const svg = MERMAID_FLOWCHART_TYPES.has(type)
    ? await renderFlowchart(mermaid, code)
    : await renderCode(mermaid, code);
  return decorateSvg(svg.replaceAll("<a ", MERMAID_LINK_TAG));
};

const enqueueRender = (code: string, scheme: MermaidScheme) => {
  const task = renderQueue.then(() => renderSvg(code, scheme));
  renderQueue = task.catch(() => undefined);
  return task;
};

const rememberSvg = (key: string, svg: string) => {
  if (readySvgs.size >= MERMAID_CACHE_LIMIT) {
    readySvgs.delete(readySvgs.keys().next().value ?? "");
  }
  readySvgs.set(key, svg);
  return svg;
};

export const getRenderedMermaid = (code: string, scheme: MermaidScheme) =>
  readySvgs.get(toCacheKey(code, scheme));

export const renderMermaid = (code: string, scheme: MermaidScheme) => {
  const key = toCacheKey(code, scheme);
  const ready = readySvgs.get(key);
  if (ready) return Promise.resolve(ready);
  const pending =
    pendingSvgs.get(key) ??
    enqueueRender(code, scheme)
      .then((svg) => rememberSvg(key, svg))
      .finally(() => pendingSvgs.delete(key));
  pendingSvgs.set(key, pending);
  return pending;
};

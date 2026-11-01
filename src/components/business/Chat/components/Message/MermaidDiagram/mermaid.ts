import { readClassModel } from "./classModel";
import {
  MERMAID_CACHE_LIMIT,
  MERMAID_CLASS_TYPES,
  MERMAID_CONFIGS,
  MERMAID_FLOWCHART_TYPES,
  MERMAID_ID_PREFIX,
  MERMAID_LAYOUTS,
  MERMAID_LINK_TAG,
} from "./constants";
import { toRoundedDecisions } from "./flowchart";
import { decorateSvg } from "./svg";
import type { Mermaid, RenderedMermaid } from "./types";

export type MermaidScheme = keyof typeof MERMAID_CONFIGS;

let mermaidModule: Promise<typeof import("mermaid")> | undefined;
let renderQueue: Promise<unknown> = Promise.resolve();
let renderCount = 0;
const readyDiagrams = new Map<string, RenderedMermaid>();
const pendingDiagrams = new Map<string, Promise<RenderedMermaid>>();

const toCacheKey = (code: string, scheme: MermaidScheme) =>
  `${scheme}\n${code}`;

const loadMermaid = () => {
  mermaidModule ??= Promise.all([
    import("mermaid"),
    import("@mermaid-js/layout-elk"),
  ])
    .then(([mermaid, { default: elkLayouts }]) => {
      mermaid.default.registerLayoutLoaders(elkLayouts);
      return mermaid;
    })
    .catch((error) => {
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

const renderDiagram = async (
  code: string,
  scheme: MermaidScheme,
): Promise<RenderedMermaid> => {
  const [{ default: mermaid }] = await Promise.all([
    loadMermaid(),
    document.fonts.ready,
  ]);
  mermaid.initialize(MERMAID_CONFIGS[scheme]);
  const type = getDiagramType(mermaid, code) ?? "";
  const layoutConfig = getLayoutConfig(scheme, type);
  if (layoutConfig) mermaid.initialize(layoutConfig);
  const svg = MERMAID_FLOWCHART_TYPES.has(type)
    ? await renderFlowchart(mermaid, code)
    : await renderCode(mermaid, code);
  return {
    svg: decorateSvg(svg.replaceAll("<a ", MERMAID_LINK_TAG)),
    classModel: MERMAID_CLASS_TYPES.has(type)
      ? await readClassModel(mermaid, code).catch(() => undefined)
      : undefined,
  };
};

const enqueueRender = (code: string, scheme: MermaidScheme) => {
  const task = renderQueue.then(() => renderDiagram(code, scheme));
  renderQueue = task.catch(() => undefined);
  return task;
};

const rememberDiagram = (key: string, diagram: RenderedMermaid) => {
  if (readyDiagrams.size >= MERMAID_CACHE_LIMIT) {
    readyDiagrams.delete(readyDiagrams.keys().next().value ?? "");
  }
  readyDiagrams.set(key, diagram);
  return diagram;
};

export const getRenderedMermaid = (code: string, scheme: MermaidScheme) =>
  readyDiagrams.get(toCacheKey(code, scheme));

export const renderMermaid = (code: string, scheme: MermaidScheme) => {
  const key = toCacheKey(code, scheme);
  const ready = readyDiagrams.get(key);
  if (ready) return Promise.resolve(ready);
  const pending =
    pendingDiagrams.get(key) ??
    enqueueRender(code, scheme)
      .then((diagram) => rememberDiagram(key, diagram))
      .finally(() => pendingDiagrams.delete(key));
  pendingDiagrams.set(key, pending);
  return pending;
};

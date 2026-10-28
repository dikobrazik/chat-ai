import {
  MERMAID_CACHE_LIMIT,
  MERMAID_CONFIGS,
  MERMAID_ID_PREFIX,
  MERMAID_LINK_TAG,
} from "./constants";

export type MermaidScheme = keyof typeof MERMAID_CONFIGS;

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

const renderSvg = async (code: string, scheme: MermaidScheme) => {
  const { default: mermaid } = await loadMermaid();
  mermaid.initialize(MERMAID_CONFIGS[scheme]);
  renderCount += 1;
  const { svg } = await mermaid.render(
    `${MERMAID_ID_PREFIX}${renderCount}`,
    code,
  );
  return svg.replaceAll("<a ", MERMAID_LINK_TAG);
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

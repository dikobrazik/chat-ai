import type { Prompt } from "@/api";
import { CODE_PATTERN } from "../constants";
import { parseUrl } from "../utils";
import {
  FAVICON_URL,
  URL_HOST_PATTERN,
  URL_PATTERN,
  URL_TRAILING_PUNCTUATION_PATTERN,
} from "./constants";

export type MessageSource = {
  url: string;
  host: string;
  name: string;
  title?: string;
};

const hasUnclosedParen = (url: string) =>
  url.split("(").length < url.split(")").length;

const trimUrl = (url: string): string => {
  const trimmed = url.replace(URL_TRAILING_PUNCTUATION_PATTERN, "");

  return trimmed.endsWith(")") && hasUnclosedParen(trimmed)
    ? trimUrl(trimmed.slice(0, -1))
    : trimmed;
};

const findUrls = (markdown: string) =>
  [...markdown.replace(CODE_PATTERN, " ").matchAll(URL_PATTERN)].map(
    ([, linkUrl, bareUrl]) => ({ url: linkUrl ?? trimUrl(bareUrl) }),
  );

const toSource = ({
  url: href,
  title,
}: NonNullable<Prompt["sources"]>[number]): MessageSource | null => {
  const url = parseUrl(href);

  if (!url || !url.protocol.startsWith("http")) return null;

  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith("utm_")) url.searchParams.delete(key);
  }

  const [, name = url.hostname] = href.match(URL_HOST_PATTERN) ?? [];

  return {
    url: url.toString(),
    host: url.hostname,
    name: name.toLowerCase(),
    title: title?.trim() || undefined,
  };
};

export const getMessageSources = (
  markdown: string,
  promptSources: Prompt["sources"],
) => {
  const links = promptSources?.length ? promptSources : findUrls(markdown);

  const sourcesByUrl = new Map<string, MessageSource>();

  for (const source of links.map(toSource)) {
    if (!source) continue;

    const known = sourcesByUrl.get(source.url);
    sourcesByUrl.set(
      source.url,
      known ? { ...known, title: known.title ?? source.title } : source,
    );
  }

  const sources = [...sourcesByUrl.values()];
  const faviconHosts = [...new Set(sources.map(({ host }) => host))].slice(
    0,
    4,
  );

  return {
    sources,
    faviconHosts,
    hiddenCount: sources.length - faviconHosts.length,
  };
};

export const getFaviconUrl = (host: string) =>
  `${FAVICON_URL}${host}?size=120&stub=1`;

export type MessageSourcesData = ReturnType<typeof getMessageSources>;

import {
  CITATION_GROUP_PATTERN,
  CITATION_LINK_PATTERN,
  CODE_PATTERN,
  NUMBER_PATTERN,
  NUMERIC_CITATION_PATTERN,
  STREAMING_CITATION_TAIL_PATTERN,
  WWW_PREFIX_PATTERN,
} from "./constants";

export const parseUrl = (href: string) => {
  try {
    return new URL(href);
  } catch {
    return null;
  }
};

const isCitation = (label: string, href: string) => {
  const text = label.trim().toLowerCase().replace(WWW_PREFIX_PATTERN, "");
  const host = parseUrl(href)?.hostname.replace(WWW_PREFIX_PATTERN, "") ?? "";

  return (
    NUMBER_PATTERN.test(text) ||
    (text.includes(".") && (host === text || host.endsWith(`.${text}`)))
  );
};

const removeCitations = (text: string) =>
  text
    .replace(CITATION_GROUP_PATTERN, (group) =>
      [...group.matchAll(CITATION_LINK_PATTERN)].every(([, label, href]) =>
        isCitation(label, href),
      )
        ? ""
        : group,
    )
    .replace(NUMERIC_CITATION_PATTERN, "");

export const stripCitations = (markdown: string, isStreaming: boolean) => {
  const parts = markdown.split(CODE_PATTERN);

  return parts
    .map((part, index) => {
      if (index % 2) return part;

      const text = removeCitations(part);

      return isStreaming && index === parts.length - 1
        ? text.replace(STREAMING_CITATION_TAIL_PATTERN, "")
        : text;
    })
    .join("");
};

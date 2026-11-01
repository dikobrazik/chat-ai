import type { ClassLink } from "../types";
import {
  CLASS_COUNT_KINDS,
  CLASS_COUNT_PHRASES,
  CLASS_DEFAULT_GLYPH,
  CLASS_LINK_KINDS,
  CLASS_RELATION_GLYPHS,
  CLASS_RELATION_KINDS,
  CYRILLIC_PATTERN,
  LATIN_CLASS_NAME_PATTERN,
} from "./constants";

const normalize = (count: string) => count.trim().toLowerCase();

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const isLatin = (name: string) => LATIN_CLASS_NAME_PATTERN.test(name);

const withCount = (count: string, name: string) =>
  count ? `${count} ${name}` : name;

const toSentence = ({ from, to, fromCount, toCount, label }: ClassLink) => {
  const fromPhrase = CLASS_COUNT_PHRASES[normalize(fromCount)];
  const toPhrase = CLASS_COUNT_PHRASES[normalize(toCount)];
  const isRussianLabel = CYRILLIC_PATTERN.test(label);
  if (!fromPhrase || !toPhrase || !isLatin(from) || !isLatin(to)) {
    return undefined;
  }
  if (!isRussianLabel) return undefined;
  return `${capitalize(fromPhrase)} ${from} ${label} ${toPhrase} ${to}`;
};

const toKind = ({ fromCount, toCount }: ClassLink) => {
  const fromSide = CLASS_COUNT_KINDS[normalize(fromCount)];
  const toSide = CLASS_COUNT_KINDS[normalize(toCount)];
  return fromSide && toSide
    ? CLASS_LINK_KINDS[`${fromSide}-${toSide}`]
    : undefined;
};

export const getLinkCaption = (link: ClassLink) => {
  const sentence = toSentence(link);
  if (sentence) return { caption: sentence, lineLabel: "" };
  const kind = toKind(link);
  return { caption: kind && capitalize(kind), lineLabel: link.label };
};

const getInheritance = (link: ClassLink) => {
  if (link.fromMarker === "extension") {
    return { parent: link.from, child: link.to };
  }
  if (link.toMarker === "extension") {
    return { parent: link.to, child: link.from };
  }
  return undefined;
};

const getRelationKind = (link: ClassLink) => {
  const marker = link.fromMarker ?? link.toMarker;
  if (!marker) return undefined;
  return (
    (link.isDashed && CLASS_RELATION_KINDS[`dashed-${marker}`]) ||
    CLASS_RELATION_KINDS[marker]
  );
};

export const getRelationTitle = (link: ClassLink) => {
  const glyph =
    CLASS_RELATION_GLYPHS[
      `${link.fromMarker ?? "none"}-${link.toMarker ?? "none"}`
    ] ?? CLASS_DEFAULT_GLYPH;
  return `${link.from} ${glyph} ${link.to}`;
};

export const getRelationDescription = (link: ClassLink) => {
  const inheritance = getInheritance(link);
  const kind = getRelationKind(link);
  if (inheritance && !link.label) {
    const { parent, child } = inheritance;
    const verb = link.isDashed ? "реализует" : "наследуется от";
    return isLatin(parent)
      ? `${child} ${verb} ${parent}`
      : `${child} → ${parent} (${kind})`;
  }
  const isRussianLabel = CYRILLIC_PATTERN.test(link.label);
  const notes = [isRussianLabel ? "" : link.label, kind].filter(Boolean);
  const hasCounts = Boolean(link.fromCount || link.toCount);
  if (!isRussianLabel && !notes.length && !hasCounts) return undefined;
  const fromPart = withCount(link.fromCount, link.from);
  const toPart = withCount(link.toCount, link.to);
  const sentence = isRussianLabel
    ? `${fromPart} ${link.label} ${toPart}`
    : `${fromPart} — ${toPart}`;
  return notes.length ? `${sentence} (${notes.join(", ")})` : sentence;
};

export const getClassNote = (name: string, links: ClassLink[]) => {
  const parent = links
    .map(getInheritance)
    .find((inheritance) => inheritance?.child === name)?.parent;
  if (!parent) return undefined;
  return isLatin(parent)
    ? `Наследуется от ${parent}`
    : `Наследование: ${parent}`;
};

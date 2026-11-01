import type { ClassLink } from "../types";
import {
  CLASS_COUNT_KINDS,
  CLASS_COUNT_PHRASES,
  CLASS_LINK_KINDS,
  CYRILLIC_PATTERN,
  LATIN_CLASS_NAME_PATTERN,
} from "./constants";

const normalize = (count: string) => count.trim().toLowerCase();

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const toSentence = ({ from, to, fromCount, toCount, label }: ClassLink) => {
  const fromPhrase = CLASS_COUNT_PHRASES[normalize(fromCount)];
  const toPhrase = CLASS_COUNT_PHRASES[normalize(toCount)];
  const isLatinNames =
    LATIN_CLASS_NAME_PATTERN.test(from) && LATIN_CLASS_NAME_PATTERN.test(to);
  const isRussianLabel = CYRILLIC_PATTERN.test(label);
  if (!fromPhrase || !toPhrase || !isLatinNames || !isRussianLabel) {
    return undefined;
  }
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

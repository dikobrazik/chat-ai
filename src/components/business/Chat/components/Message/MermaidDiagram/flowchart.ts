import { MERMAID_DECISION_CLASS } from "./constants";

const DECISION_PATTERN =
  /"[^"\n]*"|([\p{L}\p{N}_](?:-?[\p{L}\p{N}_])*)\{(?!\{)((?:"[^"\n]*"|[^{}"\n])*)\}(?!\})/gu;

const QUOTED_LABEL_PATTERN = /^"[^"]*"$/;

const toQuotedLabel = (label: string) => {
  const text = label.trim();
  return QUOTED_LABEL_PATTERN.test(text)
    ? text
    : `"${text.replaceAll('"', "#quot;")}"`;
};

export const toRoundedDecisions = (code: string) => {
  const ids = new Set<string>();
  const roundedCode = code.replace(
    DECISION_PATTERN,
    (match, id: string | undefined, label: string) => {
      if (!id) return match;
      ids.add(id);
      return `${id}(${toQuotedLabel(label)})`;
    },
  );
  if (!ids.size) return code;
  return `${roundedCode}\nclass ${[...ids].join(",")} ${MERMAID_DECISION_CLASS}`;
};

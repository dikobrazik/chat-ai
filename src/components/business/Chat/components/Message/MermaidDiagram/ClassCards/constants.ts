export const CLASS_ACCENT_COUNT = 4;

export const CLASS_COUNT_PHRASES: Partial<Record<string, string>> = {
  "1": "один",
  "0..1": "ноль или один",
  "1..*": "один или несколько",
  "1..n": "один или несколько",
  "*": "множество",
  "0..*": "множество",
  n: "множество",
  "0..n": "множество",
  many: "множество",
};

export const CLASS_COUNT_KINDS: Partial<Record<string, "one" | "many">> = {
  "1": "one",
  "0..1": "one",
  "1..*": "many",
  "1..n": "many",
  "*": "many",
  "0..*": "many",
  n: "many",
  "0..n": "many",
  many: "many",
};

export const CLASS_LINK_KINDS: Record<string, string> = {
  "one-one": "один к одному",
  "one-many": "один ко многим",
  "many-one": "многие к одному",
  "many-many": "многие ко многим",
};

export const CLASS_RELATION_GLYPHS: Partial<Record<string, string>> = {
  "none-dependency": "→",
  "dependency-none": "←",
  "dependency-dependency": "↔",
  "none-extension": "→",
  "extension-none": "←",
  "none-composition": "←◆",
  "composition-none": "◆→",
  "none-aggregation": "←◇",
  "aggregation-none": "◇→",
  "none-lollipop": "—○",
  "lollipop-none": "○—",
};

export const CLASS_DEFAULT_GLYPH = "—";

export const CLASS_RELATION_KINDS: Partial<Record<string, string>> = {
  composition: "композиция",
  aggregation: "агрегация",
  extension: "наследование",
  "dashed-dependency": "зависимость",
  "dashed-extension": "реализация",
  lollipop: "интерфейс",
};

export const LATIN_CLASS_NAME_PATTERN = /^[\w<>,. ]+$/;

export const CYRILLIC_PATTERN = /[а-яё]/i;

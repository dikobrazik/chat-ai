export type Mermaid = typeof import("mermaid")["default"];

export type ClassItem = { id: string; text: string };

export type ClassCard = {
  id: string;
  name: string;
  annotations: string[];
  members: ClassItem[];
  methods: ClassItem[];
};

export type ClassLink = {
  id: string;
  from: string;
  to: string;
  fromCount: string;
  toCount: string;
  label: string;
  isDashed: boolean;
};

export type ClassModel = { classes: ClassCard[]; links: ClassLink[] };

export type RenderedMermaid = { svg: string; classModel?: ClassModel };

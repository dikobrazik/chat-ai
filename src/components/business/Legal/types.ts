export type LegalDetailsRow = {
  label: string;
  items: string[];
};

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "details"; rows: LegalDetailsRow[] };

export type LegalSection = {
  title?: string;
  blocks: LegalBlock[];
};

export type LegalDocumentData = {
  title: string;
  edition?: string;
  sections: LegalSection[];
};

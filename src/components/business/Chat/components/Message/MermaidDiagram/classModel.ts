import { MERMAID_DOTTED_LINE, MERMAID_NO_RELATION_TITLE } from "./constants";
import type { ClassModel, Mermaid } from "./types";

type MemberEntry = { getDisplayDetails: () => { displayText: string } };

type ClassEntry = {
  id: string;
  label: string;
  type: string;
  annotations: string[];
  members: MemberEntry[];
  methods: MemberEntry[];
};

type RelationEntry = {
  id1: string;
  id2: string;
  relationTitle1: string;
  relationTitle2: string;
  title?: string;
  relation: { lineType: number };
};

type ClassDiagramDb = {
  getClasses: () => Map<string, ClassEntry>;
  getRelations: () => RelationEntry[];
};

const VISIBILITY_PATTERN = /^([+\-#~])(?=\S)/;

const isClassDiagramDb = (db: unknown): db is ClassDiagramDb =>
  typeof (db as ClassDiagramDb).getClasses === "function" &&
  typeof (db as ClassDiagramDb).getRelations === "function";

const toName = ({ id, label, type }: ClassEntry) => {
  const name = label || id;
  return type ? `${name}<${type}>` : name;
};

const toCount = (title: string) =>
  title === MERMAID_NO_RELATION_TITLE ? "" : title;

const toItems = (classId: string, kind: string, entries: MemberEntry[]) =>
  entries.map((entry, index) => ({
    id: `${classId}-${kind}-${index}`,
    text: entry
      .getDisplayDetails()
      .displayText.replace(VISIBILITY_PATTERN, "$1 "),
  }));

export const readClassModel = async (
  mermaid: Mermaid,
  code: string,
): Promise<ClassModel | undefined> => {
  const { db } = await mermaid.mermaidAPI.getDiagramFromText(code);
  if (!isClassDiagramDb(db)) return undefined;
  const entries = [...db.getClasses().values()];
  const names = new Map(entries.map((entry) => [entry.id, toName(entry)]));
  return {
    classes: entries.map((entry) => ({
      id: entry.id,
      name: toName(entry),
      annotations: entry.annotations,
      members: toItems(entry.id, "member", entry.members),
      methods: toItems(entry.id, "method", entry.methods),
    })),
    links: db.getRelations().map((relation, index) => ({
      id: `${relation.id1}-${relation.id2}-${index}`,
      from: names.get(relation.id1) ?? relation.id1,
      to: names.get(relation.id2) ?? relation.id2,
      fromCount: toCount(relation.relationTitle1),
      toCount: toCount(relation.relationTitle2),
      label: relation.title ?? "",
      isDashed: relation.relation.lineType === MERMAID_DOTTED_LINE,
    })),
  };
};

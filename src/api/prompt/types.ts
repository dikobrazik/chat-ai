export type Prompt = {
  id: string;
  text: string;
  isStreaming?: boolean;
  thinking?: string;
  sources?: PromptSource[];
  files: PromptFile[];
  role: PromptRole;
};

type PromptFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

type PromptSource = {
  url: string;
  title?: string;
};

type PromptRole = "user" | "model";

export type SearchResult = {
  id: string;
  chatId: string;
  preview: string;
};

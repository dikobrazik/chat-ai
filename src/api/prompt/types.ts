export type Prompt = {
  id: string;
  text: string;
  isStreaming?: boolean;
  thinking?: string;
  files: PromptFile[];
  role: PromptRole;
  limit?: PromptLimit;
};

type PromptFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

type PromptRole = "user" | "model";

export type PromptLimit = {
  reason: string;
  resetAt: number | null;
};

export type SearchResult = {
  id: string;
  chatId: string;
  preview: string;
};

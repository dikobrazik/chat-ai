export type Prompt = {
  id: string;
  text: string;
  isStreaming?: boolean;
  thinking?: string;
  files: PromptFile[];
  role: PromptRole;
};

type PromptFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

type PromptRole = "user" | "model";

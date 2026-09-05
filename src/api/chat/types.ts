export type Chat = {
  id: string;
  model_id: number;
  is_pinned: boolean;
  title: string;
};

export type PromptFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

type PromptRole = "user" | "model";

export type Prompt = {
  id: string;
  text: string;
  isStreaming?: boolean;
  thinking?: string;
  files: PromptFile[];
  role: PromptRole;
};

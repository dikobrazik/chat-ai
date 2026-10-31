import { useMemo } from "react";
import type { Prompt } from "@/api";
import { stripCitations } from "../utils";

export const useMessageText = (
  text: string,
  role: Prompt["role"],
  isStreaming: boolean,
) =>
  useMemo(
    () => (role === "model" ? stripCitations(text, isStreaming) : text),
    [text, role, isStreaming],
  );

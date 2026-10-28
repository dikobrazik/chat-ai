import type { Prompt } from "@/api";
import {
  ERROR_MESSAGE_ID,
  INTERRUPTED_MESSAGE_ID,
  SYSTEM_MESSAGES,
} from "../constants";

export const useMessageState = ({
  id,
  role,
  text,
}: Pick<Prompt, "id" | "role" | "text">) => {
  const isSystem = SYSTEM_MESSAGES.includes(id);
  const isError = id.startsWith(ERROR_MESSAGE_ID);
  const isInterrupted = id.startsWith(INTERRUPTED_MESSAGE_ID);
  const isEmpty = role === "model" && !isSystem && !isError && !text.trim();

  return {
    isError,
    isInterrupted,
    isEmpty,
    hasActions: !(isSystem || isError || isInterrupted || isEmpty),
  };
};

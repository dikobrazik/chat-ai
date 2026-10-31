import { useMemo } from "react";
import type { Prompt } from "@/api";
import { getMessageSources } from "./utils";

export const useMessageSources = (
  text: string,
  promptSources: Prompt["sources"],
) =>
  useMemo(() => getMessageSources(text, promptSources), [text, promptSources]);

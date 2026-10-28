import { useMemo } from "react";
import {
  prepareMarkdown,
  splitMarkdownIntoBlocks,
  splitStreamingMarkdownIntoBlocks,
} from "../markdown";

export const useMessageMarkdown = (message: string, isStreaming: boolean) => {
  const markdown = useMemo(
    () => prepareMarkdown(message, isStreaming),
    [message, isStreaming],
  );

  return {
    markdown,
    splitIntoBlocks: isStreaming
      ? splitStreamingMarkdownIntoBlocks
      : splitMarkdownIntoBlocks,
  };
};

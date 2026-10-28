import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import type { Prompt } from "@/api";
import { STREAM_RENDER_INTERVAL } from "../components/Message/constants";
import { createStreamingMessage } from "./utils";

type PendingDelta = {
  id: string;
  text: string;
};

export const useStreamBuffer = (
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const pendingRef = useRef<PendingDelta | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cancel = () => {
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
    pendingRef.current = null;
  };

  const flush = () => {
    const pending = pendingRef.current;
    cancel();
    if (!pending) return;
    setMessages((prevMessages) => [
      createStreamingMessage(
        pending.id,
        (prevMessages[0].text ?? "") + pending.text,
      ),
      ...prevMessages.slice(1),
    ]);
  };

  const push = (id: string, content: string) => {
    pendingRef.current = {
      id,
      text: (pendingRef.current?.text ?? "") + content,
    };
    timerRef.current ??= setTimeout(flush, STREAM_RENDER_INTERVAL);
  };

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
      pendingRef.current = null;
    },
    [],
  );

  return { push, flush, cancel };
};

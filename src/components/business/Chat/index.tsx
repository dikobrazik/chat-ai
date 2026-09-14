"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PromptField } from "@/components/business/PromptField";
import { useFiles } from "@/providers/FilesProvider/useFiles";
import { Footer } from "../Footer";
import css from "./Chat.module.scss";
import { Message } from "./components/Message";
import { WAITING_RESPONSE_MESSAGE_ID } from "./components/Message/constants";
import { useChat } from "./hooks/useChat";
import { useSendPromptStream } from "./hooks/useSendPromptStream";

export const Chat = () => {
  const { id: chatId } = useParams();
  const searchParams = useSearchParams();
  const { attachments } = useFiles();

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const promptToScrollRef = useRef<string | null>(null);
  const [value, setValue] = useState("");

  const { messages, isChatCreating, setMessages } = useChat(chatId as string);

  const { sendPrompt, isPromptSending } = useSendPromptStream(
    chatId as string,
    setMessages,
  );

  useEffect(() => {
    const query = searchParams.get("query");
    const promptId = searchParams.get("promptId");

    const url = new URL(window.location.href);

    url.searchParams.delete("query");
    url.searchParams.delete("promptId");

    if (promptId) {
      promptToScrollRef.current = decodeURIComponent(promptId);
    }

    window.history.replaceState({}, "", url.toString());

    if (query) {
      onSendClick(decodeURIComponent(query));
    }
  }, []);

  // после поиска скроллим к нужному сообщению
  useEffect(() => {
    const promptId = promptToScrollRef.current;
    const prompt = document.getElementById(`prompt-user-${promptId}`);

    if (prompt) {
      prompt.scrollIntoView({ behavior: "smooth", block: "start" });
      promptToScrollRef.current = null;
    }
  }, [messages]);

  const onSendClick = async (input?: string) => {
    if (isChatCreating || isPromptSending) return;

    setMessages([
      { id: WAITING_RESPONSE_MESSAGE_ID, text: "", role: "model", files: [] },
      {
        id: crypto.randomUUID(),
        text: input || value,
        role: "user",
        files: attachments.map((attachment) => ({
          id: attachment.id,
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
        })),
      },
      ...messages,
    ]);
    sendPrompt({
      input: input || value,
      filesIds: attachments.map((attachment) => attachment.id),
    });
    setValue("");
    messagesContainerRef.current?.scrollTo(0, 0);
  };

  return (
    <div className={css.container}>
      <div ref={messagesContainerRef} className={css.messages}>
        {messages.map((message) => (
          <Message
            key={`${message.id}`}
            id={message.id}
            text={message.text}
            files={message.files}
            role={message.role}
            isStreaming={message.isStreaming}
          />
        ))}
      </div>

      <PromptField
        value={value}
        placeholder="Спросите о чём угодно"
        isPromptSending={isPromptSending}
        isChatCreating={isChatCreating}
        onInputChange={setValue}
        onSendClick={onSendClick}
      />

      <Footer />
    </div>
  );
};

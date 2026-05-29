"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PromptField } from "@/components/business/PromptField";
import { useFiles } from "@/providers/FilesProvider/useFiles";
import css from "./Chat.module.scss";
import {
  Message,
  WAITING_RESPONSE_MESSAGE_ID,
} from "./components/Message/message";
import { useChat } from "./hooks/useChat";
import { useSendPromptStream } from "./hooks/useSendPromptStream";

export const Chat = () => {
  const { id: chatId } = useParams();
  const searchParams = useSearchParams();
  const { attachments } = useFiles();

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  const { messages, isChatCreating, setMessages } = useChat(chatId as string);

  const { sendPrompt, isPromptSending } = useSendPromptStream(
    chatId as string,
    setMessages,
  );

  useEffect(() => {
    const query = searchParams.get("query");
    window.history.replaceState({}, "", `/chat/${chatId}`);

    if (query) {
      onSendClick(decodeURIComponent(query));
    }
  }, []);

  const onSendClick = async (input?: string) => {
    if (isChatCreating || isPromptSending) return;

    setMessages([
      { id: WAITING_RESPONSE_MESSAGE_ID, text: "", role: "model", files: [] },
      {
        id: crypto.randomUUID(),
        text: input || value,
        role: "user",
        files: [],
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
            message={message.text}
            files={message.files}
            role={message.role}
          />
        ))}
      </div>

      <PromptField
        value={value}
        isPromptSending={isPromptSending}
        isChatCreating={isChatCreating}
        onInputChange={setValue}
        onSendClick={onSendClick}
      />
    </div>
  );
};

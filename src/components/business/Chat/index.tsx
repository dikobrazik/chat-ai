"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PromptField } from "@/components/business/PromptField";
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

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  const { messages, isChatCreating, createChat, setMessages } = useChat(
    chatId as string,
  );

  const { sendPrompt, isPromptSending } = useSendPromptStream(
    chatId as string,
    setMessages,
  );

  useEffect(() => {
    const query = searchParams.get("query");
    if (query && chatId === "new") {
      setValue(decodeURIComponent(query));
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo(0, 0);
        onSendClick(decodeURIComponent(query));
      }, 0);
    }
  }, []);

  const onSendClick = async (input?: string) => {
    if (isChatCreating || isPromptSending) return;

    let newChatId: string | undefined;

    if (!chatId || chatId === "new") {
      newChatId = await createChat();
    }

    setMessages([
      { id: WAITING_RESPONSE_MESSAGE_ID, text: "", role: "model" },
      { id: crypto.randomUUID(), text: input || value, role: "user" },
      ...messages,
    ]);
    sendPrompt({ input: input || value, newChatId });
    setValue("");
    messagesContainerRef.current?.scrollTo(0, 0);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isChatCreating || isPromptSending || !value) return;

    if (
      event?.key === "Enter" &&
      (!event?.shiftKey || !event?.altKey || !event?.ctrlKey)
    ) {
      event.preventDefault();
      onSendClick();
    }
  };

  return (
    <div className={css.container}>
      <div ref={messagesContainerRef} className={css.messages}>
        {messages.map((message) => (
          <Message
            key={`${message.id}`}
            id={message.id}
            message={message.text}
            role={message.role}
          />
        ))}
      </div>

      <PromptField
        value={value}
        isPromptSending={isPromptSending}
        isChatCreating={isChatCreating}
        onKeyDown={onKeyDown}
        onInputChange={onInputChange}
        onSendClick={onSendClick}
      />
    </div>
  );
};

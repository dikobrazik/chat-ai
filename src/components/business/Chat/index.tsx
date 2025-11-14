"use client";

import Button from "@/components/ui/Button";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import css from "./Chat.module.scss";
import {
  Message,
  WAITING_RESPONSE_MESSAGE_ID,
} from "./components/Message/message";
import { useChat } from "./hooks/useChat";
import { useSendPromptStream } from "./hooks/useSendPromptStream";

export const Chat = () => {
  const { id: chatId } = useParams();

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  const { messages, isChatCreating, createChat, setMessages } = useChat(
    chatId as string,
  );

  const { sendPrompt, isPromptSending } = useSendPromptStream(
    chatId as string,
    setMessages,
  );

  const onSendClick = async () => {
    if (isChatCreating || isPromptSending) return;

    let newChatId: string | undefined = undefined;

    if (!chatId) {
      newChatId = await createChat();
    }

    setMessages([
      { id: WAITING_RESPONSE_MESSAGE_ID, text: "", role: "model" },
      { id: crypto.randomUUID(), text: value, role: "user" },
      ...messages,
    ]);
    sendPrompt({ input: value, newChatId });
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

      <div className={css.controlsContainer}>
        <textarea
          id="prompt"
          name="prompt"
          className={css.textfield}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
        />

        <div className={css.controls}>
          <div></div>
          {Boolean(value || isPromptSending || isChatCreating) && (
            <Button
              className={css.button}
              size="xs"
              variant="outline"
              loading={isPromptSending || isChatCreating}
              onClick={onSendClick}
            >
              {isPromptSending || isChatCreating ? "" : "Отправить"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

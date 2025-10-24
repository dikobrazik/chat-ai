"use client";

import { getChat, getModels, sendPrompt } from "@/api";
import Button from "@/components/ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import css from "./Chat.module.scss";
import { useParams } from "next/navigation";

const WAITING_RESPONSE_MESSAGE = "AI is typing...";

export const Chat = () => {
  const queryClient = useQueryClient();
  const { id: chatId } = useParams();

  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const { mutate } = useMutation({
    mutationFn: sendPrompt,
    onSuccess: (response) => {
      if (!chatId) {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        window.history.replaceState({}, "", `/chat/${response.chatId}`);
      }
      setMessages((prevMessages) => [
        response.response.text,
        ...prevMessages.slice(1),
      ]);
    },
  });

  const { data: chatMessagesHistory } = useQuery({
    queryKey: ["chatMessages", chatId],
    enabled: !!chatId,
    refetchInterval: false,
    queryFn: () =>
      getChat(chatId as string).catch((error) => {
        if (error.status === 401) {
          window.history.replaceState({}, "", `/`);
        }

        return [];
      }),
  });

  useEffect(() => {
    setMessages(chatMessagesHistory || []);
  }, [chatMessagesHistory]);

  const onSendClick = () => {
    setMessages([WAITING_RESPONSE_MESSAGE, value, ...messages]);
    mutate({ input: value, chatId });
    setValue("");
  };

  const { data: models } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    refetchInterval: false,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      <div className={css.messages}>
        {messages.map((message, index) => (
          <div key={`${message}-${index}`} className={css.message}>
            {message === WAITING_RESPONSE_MESSAGE ? (
              <span className={css.typingIndicator}>
                &nbsp;
                <span className={css.dot}></span>
                <span className={css.dot}></span>
                <span className={css.dot}></span>
              </span>
            ) : (
              message
            )}
          </div>
        ))}
      </div>

      <label htmlFor="prompt" className={css.controlsContainer}>
        <textarea
          id="prompt"
          name="prompt"
          className={css.textfield}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
        />

        <div className={css.controls}>
          <select>
            {models?.map((model) => (
              <option key={model.id} value={model.id}>
                {model.id}
              </option>
            ))}
          </select>

          <Button
            className={css.button}
            size="xs"
            variant="outline"
            onClick={onSendClick}
          >
            Отправить
          </Button>
        </div>
      </label>
    </div>
  );
};

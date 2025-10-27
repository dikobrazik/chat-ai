"use client";

import { createChat, getChat, Model, Prompt, sendPrompt } from "@/api";
import Button from "@/components/ui/Button";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./Chat.module.scss";
import {
  Message,
  TOO_MANY_REQUESTS_MESSAGE_ID,
  WAITING_RESPONSE_MESSAGE_ID,
} from "./components/Message/message";

export const Chat = () => {
  const queryClient = useQueryClient();
  const { id: chatId } = useParams();

  const [messages, setMessages] = useState<Prompt[]>([]);
  const [value, setValue] = useState("");
  const { model, setModel } = useModelContext();

  const { mutateAsync: createChatMutation } = useMutation({
    mutationFn: () => createChat({ model_id: model?.id ?? 1 }),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
      }
    },
    onSuccess: (chatId) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      window.history.replaceState({}, "", `/chat/${chatId}`);
    },
  });

  const { mutate: sendPromptMutation } = useMutation({
    mutationFn: (payload: { input: string; newChatId?: string }) =>
      sendPrompt({
        input: payload.input,
        chat_id: payload.newChatId ?? (chatId as string),
        model_id: model?.id,
      }),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.status === 429) {
          setMessages((prevMessages) => [
            { id: TOO_MANY_REQUESTS_MESSAGE_ID, text: "", role: "model" },
            ...prevMessages.slice(1),
          ]);
        }
      }
    },
    onSuccess: ({ response }) => {
      setMessages((prevMessages) => [
        response,
        {
          id: `user-${response.id}`,
          text: prevMessages[1].text,
          role: "user",
        },
        ...prevMessages.slice(2),
      ]);
    },
  });

  const { data: chat } = useQuery({
    queryKey: ["chat", chatId],
    enabled: !!chatId,
    refetchInterval: false,
    queryFn: () =>
      getChat(chatId as string).catch((error) => {
        if (error.status === 401) {
          window.history.replaceState({}, "", `/`);
        } else if (error.status === 403) {
          window.history.replaceState({}, "", `/`);
        }

        return {
          prompts: [],
          chat: {
            id: "",
            model: {} as Model,
          },
        };
      }),
  });

  useEffect(() => {
    if (chat) {
      setMessages(chat.prompts);
      setModel(chat.chat.model);
    }
  }, [chat]);

  const onSendClick = async () => {
    let newChatId: string | undefined = undefined;
    console.log("chatId", chatId);
    if (!chatId) {
      newChatId = await createChatMutation();
    }
    setMessages([
      { id: WAITING_RESPONSE_MESSAGE_ID, text: "", role: "model" },
      { id: "", text: value, role: "user" },
      ...messages,
    ]);
    sendPromptMutation({ input: value, newChatId });
    setValue("");
  };

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
        {messages.map((message) => (
          <Message
            key={`${message.id}`}
            id={message.id}
            message={message.text}
            className={css.message}
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
          {value && (
            <Button
              className={css.button}
              size="xs"
              variant="outline"
              onClick={onSendClick}
            >
              Отправить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

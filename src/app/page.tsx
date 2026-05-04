"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getProfile } from "@/api/user";
import { useChat } from "@/components/business/Chat/hooks/useChat";
import { PromptField } from "@/components/business/PromptField";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/providers/AuthProvider/hooks";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const { isGuest } = useAuth();

  const { createChat } = useChat(undefined);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  const isImageChat = pathname === "/image-chat";

  const name = profile?.name;

  const sendClick = async () => {
    const chatId = await createChat();

    router.push(`/chat/${chatId}?query=${encodeURIComponent(value)}`);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!value) return;

    if (
      event?.key === "Enter" &&
      (!event?.shiftKey || !event?.altKey || !event?.ctrlKey)
    ) {
      event.preventDefault();
      sendClick();
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center  h-full">
      {!isGuest && (
        <div className="flex items-center gap-3">
          <Logo size="small" />

          <Text style="regular">Добрый день, {name}!</Text>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h1>Чем я могу помочь?</h1>
        <Text as="h2" type="s" style="regular" color="#6F6F6F">
          {isImageChat
            ? "Здесь можно создавать крутые изображения"
            : `ChatGPT, Gemini, DeepSeek, Claude и другие нейросети для работы с текстами, изображениями и видео`}
        </Text>
      </div>

      <PromptField
        ref={promptRef}
        value={value}
        placeholder={
          isImageChat
            ? "Опишите или придумайте изображение"
            : "Например, 'Напиши стихотворение в стиле Пушкина о весне'"
        }
        isPromptSending={false}
        isChatCreating={false}
        onKeyDown={onKeyDown}
        onInputChange={(e) => setValue(e.target.value)}
        onSendClick={sendClick}
      />

      {!isImageChat && (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setValue("Создай текст ");
              promptRef.current?.focus();
            }}
            variant="outline"
            leftIcon={<Icon name="firstline" />}
          >
            Создать текст
          </Button>
          <Button
            onClick={() => {
              setValue("Помоги с домашним заданием ");
              promptRef.current?.focus();
            }}
            variant="outline"
            leftIcon={<Icon name="book-saved" />}
          >
            Для учёбы
          </Button>
          <Button
            onClick={() => {
              setValue("Придумай идею ");
              promptRef.current?.focus();
            }}
            variant="outline"
            leftIcon={<Icon name="lamp-on" />}
          >
            Придумать идею
          </Button>
          <Button
            href="/image-chat"
            variant="outline"
            leftIcon={<Icon name="image" />}
          >
            Создать картинку
          </Button>
        </div>
      )}
    </div>
  );
}

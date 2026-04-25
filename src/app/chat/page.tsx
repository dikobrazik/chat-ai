"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProfile } from "@/api/user";
import { PromptField } from "@/components/business/PromptField";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/providers/AuthProvider/hooks";
import styles from "./ChatPage.module.scss";

export default function Page() {
  const [value, setValue] = useState("");
  const { isGuest } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  const name = profile?.name;

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
          ChatGPT, Gemini, DeepSeek, Claude и другие нейросети для работы с
          текстами, изображениями и видео
        </Text>
      </div>

      <PromptField
        value={value}
        isPromptSending={false}
        isChatCreating={false}
        onKeyDown={() => {}}
        onInputChange={(e) => setValue(e.target.value)}
        onSendClick={() => {}}
      />

      <div className="flex gap-2">
        <Button variant="outline" leftIcon={<Icon name="firstline" />}>
          Создать текст
        </Button>
        <Button variant="outline" leftIcon={<Icon name="book-saved" />}>
          Для учёбы
        </Button>
        <Button variant="outline" leftIcon={<Icon name="lamp-on" />}>
          Придумать идею
        </Button>
        <Button variant="outline" leftIcon={<Icon name="image" />}>
          Создать картинку
        </Button>
      </div>
    </div>
  );
}

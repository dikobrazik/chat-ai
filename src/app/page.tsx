"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useProviders } from "@/api/model";
import { getProfile } from "@/api/user";
import { useChat } from "@/components/business/Chat/hooks/useChat";
import { Footer } from "@/components/business/Footer";
import { ImageFilters } from "@/components/business/ImageFilters";
import type { ImageFilter } from "@/components/business/ImageFilters/filters";
import { isOptionDisabled } from "@/components/business/ModelSelect/modelAccess";
import { PromptField } from "@/components/business/PromptField";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { usePersistentState } from "@/hooks/usePersistenState";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import type { Attachment } from "@/providers/FilesProvider";
import { useFiles } from "@/providers/FilesProvider/useFiles";
import { useModelContext } from "@/providers/ModelProvider/hooks";

// черновик гостя на «/image-chat»: переживает уход на логин,
// после входа возвращаем промпт, вложения и модель
type ImageChatDraft = {
  prompt: string;
  modelId: number | null;
  attachments: Attachment[];
} | null;

// тайтлы главной за залогином — случайный на каждую загрузку страницы
const HOME_TITLES = [
  "Чем я могу помочь?",
  "Чем хотите заняться сегодня?",
  "Какую идею обсудим?",
  "Какую задачу решим сегодня?",
  "Чем помочь сегодня?",
  "С чего начнём?",
  "О чём поговорим?",
  "Начинайте, когда будете готовы.",
  "О чём поговорим сегодня?",
  "Что сегодня в повестке дня?",
];

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [homeTitle] = useState(
    () => HOME_TITLES[Math.floor(Math.random() * HOME_TITLES.length)],
  );
  const { isGuest } = useAuthContext();

  const { createChat } = useChat(undefined);
  const { attachments, restoreFiles } = useFiles();
  const { model, setModel } = useModelContext();
  const { data: providers } = useProviders();

  const [draft, setDraft] = usePersistentState<ImageChatDraft>(
    "image-chat-draft",
    null,
  );

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  const isImageChat = pathname === "/image-chat";

  const sendClick = async () => {
    const chatId = await createChat(value);

    router.push(`/chat/${chatId}?query=${encodeURIComponent(value)}`);
  };

  const resizePrompt = () => {
    const prompt = promptRef.current;

    if (!prompt) return;

    prompt.style.height = "auto";
    prompt.style.height = `${prompt.scrollHeight}px`;
  };

  // гостевое восстановление черновика после перезагрузки страницы
  // biome-ignore lint/correctness/useExhaustiveDependencies: только на маунте пустого композера
  useEffect(() => {
    if (!isImageChat || !isGuest || !draft) return;
    if (value || attachments.length) return;

    setValue(draft.prompt);
    restoreFiles(draft.attachments);
    requestAnimationFrame(resizePrompt);
  }, [isImageChat, isGuest]);

  // гость может уйти на логин в любой момент — держим черновик свежим;
  // обнуляем только если контент был и пользователь сам его стёр,
  // иначе пустой композер на маунте затирает черновик до восстановления
  const hadContentRef = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setDraft стабилен
  useEffect(() => {
    if (!isImageChat || !isGuest) return;

    const uploaded = attachments.filter((attachment) => attachment.isUploaded);
    const hasContent = Boolean(value) || uploaded.length > 0;

    if (!hasContent) {
      if (hadContentRef.current) {
        setDraft(null);
      }

      hadContentRef.current = false;

      return;
    }

    hadContentRef.current = true;
    setDraft({
      prompt: value,
      modelId: model?.id ?? null,
      attachments: uploaded,
    });
  }, [isImageChat, isGuest, value, attachments, model]);

  // после входа пользователь всегда попадает на «/» — возвращаем его
  // к незаконченному изображению, если модель черновика ему доступна
  // biome-ignore lint/correctness/useExhaustiveDependencies: setDraft/restoreFiles/setModel стабильны
  useEffect(() => {
    if (isGuest || !draft || !providers || !profile) return;

    const draftModel = providers
      .flatMap((provider) => provider.models)
      .find((item) => item.id === draft.modelId);

    if (!draftModel || isOptionDisabled(profile)(draftModel)) {
      setDraft(null);

      return;
    }

    if (!isImageChat) {
      router.replace("/image-chat");

      return;
    }

    setValue(draft.prompt);
    restoreFiles(draft.attachments);
    setModel({ id: draftModel.id });
    setDraft(null);
    requestAnimationFrame(resizePrompt);
  }, [isGuest, draft, providers, profile, isImageChat]);

  const onFilterSelect = async (filter: ImageFilter) => {
    if (filter.withPhoto) {
      setValue(filter.prompt);
      promptRef.current?.focus();
      requestAnimationFrame(resizePrompt);
      attachInputRef.current?.click();

      return;
    }

    const chatId = await createChat(filter.prompt);

    router.push(`/chat/${chatId}?query=${encodeURIComponent(filter.prompt)}`);
  };

  const Ideas = () => {
    return isImageChat ? null : (
      <div className="flex gap-2 flex-col sm:flex-row justify-center items-start min-h-40">
        <Button
          onClick={() => {
            setValue("Создай текст ");
            promptRef.current?.focus();
          }}
          variant="outline"
          borderRadius="full"
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
          borderRadius="full"
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
          borderRadius="full"
          leftIcon={<Icon name="lamp-on" />}
        >
          Придумать идею
        </Button>
        <Button
          href="/image-chat"
          variant="outline"
          borderRadius="full"
          leftIcon={<Icon name="image" />}
        >
          Создать картинку
        </Button>
      </div>
    );
  };

  return (
    <div
      className={cn(`flex flex-col sm:justify-between h-full`, {
        "justify-between": isImageChat,
        "justify-end": !isImageChat,
      })}
    >
      <div></div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-left sm:text-center">
          <Text as="h1" type="xl" style="regular">
            {isImageChat
              ? "Изображения"
              : isGuest
                ? "Чем я могу помочь?"
                : homeTitle}
          </Text>
          {/* сабтайтл только гостям; резерв под две строки, чтобы разная длина подзаголовков не сдвигала поле ввода */}
          {isGuest && (
            <Text
              as="h2"
              type="s"
              style="regular"
              color="#6F6F6F"
              className="min-h-10"
            >
              {isImageChat
                ? `Nano Banana, ChatGPT, Midjourney, Flux, Seedream, Stable Diffusion, Recraft и другие нейросети для работы с изображениями`
                : `ChatGPT, Gemini, DeepSeek, Claude, Nano Banana, Midjourney, Seedream и другие нейросети для работы с текстами, изображениями и видео`}
            </Text>
          )}
        </div>

        <div className="block sm:hidden">
          <Ideas />
        </div>

        <PromptField
          ref={promptRef}
          value={value}
          placeholder={
            isImageChat ? "Опишите новое изображение" : "Спросите о чём угодно"
          }
          isPromptSending={false}
          isChatCreating={false}
          attachOnly={isImageChat}
          attachInputRef={attachInputRef}
          onInputChange={setValue}
          onSendClick={sendClick}
        />
        {isImageChat && (
          <div className="min-h-40">
            <ImageFilters onSelect={onFilterSelect} />
          </div>
        )}
        <div className="hidden sm:block">
          <Ideas />
        </div>
      </div>

      <Footer />
    </div>
  );
}

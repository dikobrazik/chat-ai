import type { Model } from "@/api";

// названия и короткие описания в стиле chatlyai.app;
// бэк отдаёт технические имена моделей — маппим на витринные на фронте.
// описание должно помещаться в ОДНУ строку меню (~34 символа максимум)
const MODEL_DISPLAY: Record<string, { name: string; description: string }> = {
  "gpt-4o": {
    name: "OpenAI GPT-4o",
    description: "Универсальная мультимодальная модель",
  },
  "gpt-4o-mini": {
    name: "OpenAI GPT-4o-mini",
    description: "Самая быстрая компактная модель",
  },
  "gemini-2.5-flash": {
    name: "Gemini 2.5 Flash",
    description: "Быстрая модель на каждый день",
  },
  "grok-build-0.1": {
    name: "Grok Build 0.1",
    description: "Быстрая модель для работы с кодом",
  },
  "grok-4.3": {
    name: "Grok 4.3",
    description: "Последняя модель для рассуждений",
  },
  "deepseek-v4-pro": {
    name: "DeepSeek V4 Pro",
    description: "Мощная модель для сложных задач",
  },
  "deepseek-v4-flash": {
    name: "DeepSeek V4 Flash",
    description: "Самая экономичная модель DeepSeek",
  },
  "claude-haiku-4-5": {
    name: "Claude 4.5 Haiku",
    description: "Самая быстрая модель Anthropic",
  },
  "claude-opus-4-8": {
    name: "Claude 4.8 Opus",
    description: "Самая мощная модель Anthropic",
  },
  "claude-sonnet-4-6": {
    name: "Claude 4.6 Sonnet",
    description: "Лучший баланс скорости и интеллекта",
  },
};

export const getModelDisplay = (model: Model) =>
  MODEL_DISPLAY[model.name] ?? {
    name: model.name,
    description: model.description,
  };

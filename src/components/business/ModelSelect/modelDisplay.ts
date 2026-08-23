import type { Model } from "@/api";

// названия и короткие описания в стиле chatlyai.app;
// бэк отдаёт технические имена моделей — маппим на витринные на фронте.
// перенос строки в описании — осознанный: описание занимает 1-2 строки в меню
const MODEL_DISPLAY: Record<string, { name: string; description: string }> = {
  "gpt-4o": {
    name: "OpenAI GPT-4o",
    description: "Универсальная мультимодальная\nмодель от OpenAI",
  },
  "gpt-4o-mini": {
    name: "OpenAI GPT-4o-mini",
    description: "Самая быстрая компактная\nмодель от OpenAI",
  },
  "gemini-2.5-flash": {
    name: "Gemini 2.5 Flash",
    description: "Быстрая модель от Google\nдля повседневных задач",
  },
  "grok-build-0.1": {
    name: "Grok Build 0.1",
    description: "Быстрая модель от xAI\nдля работы с кодом",
  },
  "grok-4.3": {
    name: "Grok 4.3",
    description: "Последняя модель для\nрассуждений от xAI",
  },
  "deepseek-v4-pro": {
    name: "DeepSeek V4 Pro",
    description: "Мощная модель от DeepSeek\nдля сложных задач",
  },
  "deepseek-v4-flash": {
    name: "DeepSeek V4 Flash",
    description: "Самая экономичная модель\nот DeepSeek",
  },
  "claude-haiku-4-5": {
    name: "Claude 4.5 Haiku",
    description: "Самая быстрая и экономичная\nмодель",
  },
  "claude-opus-4-8": {
    name: "Claude 4.8 Opus",
    description: "Самая мощная модель Anthropic\nдля рассуждений и кода",
  },
  "claude-sonnet-4-6": {
    name: "Claude 4.6 Sonnet",
    description: "Лучший баланс скорости\nи интеллекта",
  },
};

export const getModelDisplay = (model: Model) =>
  MODEL_DISPLAY[model.name] ?? {
    name: model.name,
    description: model.description,
  };

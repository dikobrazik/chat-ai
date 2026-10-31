import type { Model } from "@/api";

const MODEL_FAMILY_ICONS: Record<string, string> = {
  "qwen-image": "qwen",
  qwen: "qwen",
  wan: "alibaba",
  "z-image": "alibaba",
  kimi: "kimi",
  deepseek: "deepseek",
  glm: "chatglm",
  minimax: "minimax",
  mimo: "xiaomimimo",
  step: "stepfun",
};

export const getModelIcon = (model: Model, providerName?: string) => {
  const isAlibabaModel =
    providerName?.toLowerCase() === "alibaba" ||
    model.id.toLowerCase().startsWith("alibaba:");

  if (!isAlibabaModel) {
    return `/icons/providers/${providerName}.png`;
  }

  const modelName = model.name.toLowerCase();
  const family = Object.keys(MODEL_FAMILY_ICONS).find((prefix) =>
    modelName.startsWith(prefix),
  );
  const iconName = family ? MODEL_FAMILY_ICONS[family] : "alibaba";

  return `/icons/models/${iconName}.svg`;
};

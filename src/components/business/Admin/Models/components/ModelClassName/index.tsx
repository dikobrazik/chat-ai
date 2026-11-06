import type { ModelClass } from "@/api";

type Props = {
  modelClass: ModelClass | null;
};

export const ModelClassName = ({ modelClass }: Props) => (
  <>
    {modelClass === "fast" && "Быстрая"}
    {modelClass === "advanced" && "Продвинутая"}
    {modelClass === "heavy" && "Тяжёлая"}
    {!modelClass && "—"}
  </>
);

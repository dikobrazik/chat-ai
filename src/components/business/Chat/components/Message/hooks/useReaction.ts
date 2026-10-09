import { useState } from "react";

type Reaction = "like" | "dislike";

export const useReaction = () => {
  const [reaction, setReaction] = useState<Reaction | null>(null);

  const toggleReaction = (value: Reaction) =>
    setReaction((current) => (current === value ? null : value));

  return {
    reaction,
    onLikeClick: () => toggleReaction("like"),
    onDislikeClick: () => toggleReaction("dislike"),
  };
};

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getImageUrl } from "@/api";

export const useImageUrl = (chatId: string, promptId: string) => {
  const [brokenUrl, setBrokenUrl] = useState<string>();
  const { data, isLoading } = useQuery({
    queryKey: ["image", chatId, promptId],
    queryFn: () => getImageUrl({ chatId, promptId }),
    retry: false,
  });

  return {
    imageUrl: data,
    isLoading,
    isUnavailable: !data || brokenUrl === data,
    onImageError: () => setBrokenUrl(data),
  };
};

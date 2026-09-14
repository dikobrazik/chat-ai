import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { searchPrompts } from "..";

const PLACEHOLDER_DATA = Array(10)
  .fill({
    id: "",
    chatId: "",
    preview: "",
  })
  .map((_, index) => ({
    id: `skeleton-${index}`,
    chatId: "",
    preview: "",
  }));

export const useSearchChatsAndPrompts = (search: string) => {
  const { refetch, data, isLoading } = useQuery({
    queryFn: () => searchPrompts(search),
    queryKey: ["searchChatsAndPrompts", search],
    enabled: false,
  });

  useEffect(() => {
    if (search) {
      refetch();
    }
  }, [search, refetch]);

  return { data: isLoading ? PLACEHOLDER_DATA : data, isLoading };
};

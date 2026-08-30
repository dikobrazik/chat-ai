import { useQuery } from "@tanstack/react-query";
import { getChats } from "..";

export const CHATS_QUERY_KEY = ["chats"];

export const useChats = () => {
  const { data: chats, isLoading } = useQuery({
    refetchInterval: false,
    queryKey: CHATS_QUERY_KEY,
    queryFn: getChats,
  });

  return { chats, isLoading };
};

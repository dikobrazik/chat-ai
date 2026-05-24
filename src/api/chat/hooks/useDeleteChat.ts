import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { CHATS_QUERY_KEY } from "./useChats";

export const useDeleteChat = (chatId: string, options?: MutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.delete(`chat/${chatId}`).then((response) => response.data);
      queryClient.invalidateQueries({ queryKey: CHATS_QUERY_KEY });
    },
    ...options,
  });
};

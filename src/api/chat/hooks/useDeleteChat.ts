import { type MutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteChat = (chatId: string, options?: MutationOptions) => {
  return useMutation({
    mutationFn: () =>
      axios.delete(`chat/${chatId}`).then((response) => response.data),
    ...options,
  });
};

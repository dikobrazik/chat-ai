import { useParams } from "next/navigation";
import { useChat } from "@/api";
import { useProviders } from "@/api/model";

export const useIsImageChat = () => {
  const { id: chatId } = useParams();

  const { chat } = useChat(chatId as string);
  const { data: providers } = useProviders();

  return Boolean(
    providers
      ?.flatMap((provider) => provider.models)
      .find((model) => model.id === chat?.model_id)?.for_image,
  );
};

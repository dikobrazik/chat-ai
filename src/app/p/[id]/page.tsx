"use client";

import { useParams } from "next/navigation";
import { useChatPrompt } from "@/api";
import { Message } from "@/components/business/Chat/components/Message";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PromptPage() {
  const { id } = useParams();

  const { prompt, isLoading } = useChatPrompt("loh", id as string);

  return (
    <Skeleton isLoading={isLoading} className="w-full h-full">
      <div className="flex flex-col-reverse p-8">
        {prompt && (
          <Message
            key={`${prompt.id}`}
            id={prompt.id}
            text={prompt.text}
            files={prompt.files}
            role={prompt.role}
            isStreaming={prompt.isStreaming}
          />
        )}
      </div>
    </Skeleton>
  );
}

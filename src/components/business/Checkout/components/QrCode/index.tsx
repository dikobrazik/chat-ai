import { Skeleton } from "@/components/ui/Skeleton";

type Props = {
  svg?: string;
  isLoading: boolean;
};

export const QrCode = ({ svg, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 pt-2">
        {Array.from({ length: 4 }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Skeleton key={index} isLoading height={176} width={176} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-3 pt-2 bg-white"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: svg ?? "" }}
    ></div>
  );
};

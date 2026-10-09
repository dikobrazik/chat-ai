import { Skeleton } from "@/components/ui/Skeleton";

type Props = {
  svg?: string;
  isLoading: boolean;
};

export const QrCode = ({ svg, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton className="pt-2" isLoading height={176} width={176} />;
  }

  return (
    <div
      className="flex flex-col gap-3 pt-2 bg-white"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: svg ?? "" }}
    ></div>
  );
};

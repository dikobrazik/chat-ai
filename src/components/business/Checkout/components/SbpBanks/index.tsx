"use client";

import { useSbpQr } from "@/api";
import { Skeleton } from "@/components/ui/Skeleton";

type Props = {
  tariff: string;
  sixMonths: boolean;
};

export const SbpQrCode = (props: Props) => {
  const { data, isLoading } = useSbpQr(props);

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
      dangerouslySetInnerHTML={{ __html: data?.svg ?? "" }}
    ></div>
  );
};

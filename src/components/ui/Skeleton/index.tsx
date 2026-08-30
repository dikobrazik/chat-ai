import type { CSSProperties, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = PropsWithChildren<{
  className?: string;
  isLoading?: boolean;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}>;

export const Skeleton = (props: SkeletonProps) => {
  const { isLoading, className, height, width, children } = props;

  if (!isLoading) {
    return children;
  }

  return (
    <div className={cn(className, "animate-pulse")}>
      <div
        className="w-full h-full bg-[#F7F7F7] rounded-xl"
        style={{ width, height }}
      />
    </div>
  );
};

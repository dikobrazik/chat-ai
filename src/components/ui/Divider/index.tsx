import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={cn("divider border-t border-[#EFEFEF] w-full h-px", className)}
    ></div>
  );
};

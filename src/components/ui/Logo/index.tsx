import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/common/logo.svg"
      alt="JonuAI Logo"
      width={36}
      height={36}
      className={cn(className)}
    />
  );
};

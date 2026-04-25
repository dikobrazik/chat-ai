import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZE_MAP = {
  small: 20,
  medium: 36,
  large: 48,
};

type LogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

export const Logo = ({ size, className }: LogoProps) => {
  return (
    <Image
      src="/icons/common/logo.svg"
      alt="JonuAI Logo"
      width={SIZE_MAP[size || "medium"]}
      height={SIZE_MAP[size || "medium"]}
      className={cn(className)}
    />
  );
};

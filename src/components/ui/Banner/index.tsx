import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "../Text";
import styles from "./Banner.module.scss";
import { BANNER_DESCRIPTION_COLOR } from "./constants";

export type BannerVariant = "base" | "promo";

type BannerProps = {
  title: string;
  description: string;
  action: ReactNode;
  direction?: "row" | "col";
  variant?: BannerVariant;
};

export const Banner = ({ variant = "base", ...props }: BannerProps) => {
  return (
    <div
      className={cn(
        styles.banner,
        styles[`${props.direction || "col"}`],
        styles[`variant-${variant}`],
      )}
    >
      <div>
        <Text as="div">{props.title}</Text>
        <Text
          type="xs"
          color={BANNER_DESCRIPTION_COLOR[variant]}
          as="div"
          style="regular"
        >
          {props.description}
        </Text>
      </div>
      {props.action}
    </div>
  );
};

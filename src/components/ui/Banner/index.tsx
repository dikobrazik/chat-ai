import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Text";
import styles from "./Banner.module.scss";
import { BANNER_DESCRIPTION_COLOR } from "./constants";

export type BannerVariant = "base" | "promo";

type BannerProps = {
  title: string;
  description: ReactNode;
  action?: ReactNode;
  direction?: "row" | "col";
  variant?: BannerVariant;
  onClose?: () => void;
};

export const Banner = ({ variant = "base", ...props }: BannerProps) => {
  return (
    <div
      className={cn(
        styles.banner,
        styles[`${props.direction || "col"}`],
        styles[`variant-${variant}`],
        Boolean(props.action) && styles.withAction,
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
      {props.onClose ? (
        <div className={styles.actions}>
          {props.action}
          <Button
            variant="secondary"
            leftIcon={<Icon name="close" />}
            aria-label="Закрыть"
            onClick={props.onClose}
          />
        </div>
      ) : (
        props.action
      )}
    </div>
  );
};

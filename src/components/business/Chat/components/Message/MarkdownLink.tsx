import type { ComponentProps } from "react";
import type { ExtraProps } from "streamdown";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import styles from "./Message.module.scss";
import { isAnchorLink, isImageLink, isIncompleteLink } from "./markdown";

export const MarkdownLink = ({
  node,
  className,
  href,
  rel = "noreferrer",
  target = "_blank",
  children,
  ...props
}: ComponentProps<"a"> & ExtraProps) => {
  const linkClassName = cn(
    "wrap-anywhere font-medium text-primary underline",
    className,
  );
  const isAnchor = isAnchorLink(href);

  if (isIncompleteLink(href)) {
    return (
      <span className={linkClassName} data-incomplete data-streamdown="link">
        {children}
      </span>
    );
  }

  return (
    <a
      {...props}
      className={linkClassName}
      data-streamdown="link"
      href={href}
      rel={isAnchor ? undefined : rel}
      target={isAnchor ? undefined : target}
    >
      {isImageLink(node) && (
        <Icon
          name="gallery"
          size={16}
          className={styles.imageLinkIcon}
          aria-hidden
        />
      )}
      {children}
    </a>
  );
};

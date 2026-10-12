import type { ComponentProps } from "react";
import type { ExtraProps } from "streamdown";
import { cn } from "@/lib/utils";
import { isAnchorLink, isIncompleteLink } from "./markdown";

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
      {children}
    </a>
  );
};

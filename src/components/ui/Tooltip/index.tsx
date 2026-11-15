"use client";

import type { PropsWithChildren, ReactNode } from "react";
import {
  type PopoverPosition,
  Popover as TinyPopover,
} from "react-tiny-popover";
import { useHover } from "@/hooks/useHover";
import { Text } from "../Text";
import styles from "./Tooltip.module.scss";

type Props = {
  content: ReactNode;
  position?: PopoverPosition;
};

export const Tooltip = ({
  children,
  content,
  position = "top",
}: PropsWithChildren<Props>) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover();

  return (
    <TinyPopover
      isOpen={isHovered}
      positions={position}
      padding={11}
      containerClassName={styles.tooltip}
      content={
        <Text as="div" type="s" style="regular">
          {content}
        </Text>
      }
    >
      <span
        className="flex"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </span>
    </TinyPopover>
  );
};

"use client";

import classNames from "classnames";
import type React from "react";
import { type PropsWithChildren, type ReactNode, useState } from "react";
import {
  type PopoverAlign,
  type PopoverPosition,
  Popover as TinyPopover,
} from "react-tiny-popover";
import type { ButtonProps } from "../Button";
import styles from "./Popover.module.scss";

type Props = {
  Trigger: (
    props: ButtonProps & React.RefAttributes<HTMLButtonElement>,
  ) => ReactNode;
  padding?: number;
  popoverClassName?: string;
  position?: PopoverPosition;
  align?: PopoverAlign;
};

const Popover = ({
  children,
  Trigger,
  popoverClassName,
  padding = 8,
  position = "bottom",
  align,
}: PropsWithChildren<Props>) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TinyPopover
      isOpen={isVisible}
      onClickOutside={() => setIsVisible(false)}
      positions={position}
      align={align}
      padding={padding}
      content={
        <div
          id="popover-content"
          // ref={popoverRef}
          className={classNames(
            popoverClassName,
            styles.popoverContent,
            styles[`position-${position}`],
          )}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      }
    >
      <Trigger
        // ref={triggerRef}
        onClick={toggleVisibility}
        className={styles.popoverTarget}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      />
    </TinyPopover>
  );
};

export default Popover;

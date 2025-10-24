"use client";

import React from "react";
import { Button, type ButtonProps } from "./index";
import { Icon } from "../Icon";

// Icon Button - for buttons with only icons
export interface IconButtonProps
  extends Omit<ButtonProps, "children" | "leftIcon" | "rightIcon"> {
  icon: React.ReactNode;
  "aria-label": string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "md",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    xs: "w-7 h-7 p-1",
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
    xl: "w-14 h-14 p-3",
  };

  return (
    <Button
      {...props}
      size={size}
      className={`${sizeClasses[size]} ${className}`}
      style={{ minWidth: "auto", aspectRatio: "1" }}
    >
      {icon}
    </Button>
  );
};

// Button Group - for grouping related buttons
export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  attached?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = "horizontal",
  attached = false,
  className = "",
}) => {
  const groupStyles = {
    display: "flex",
    flexDirection:
      orientation === "vertical" ? ("column" as const) : ("row" as const),
    gap: attached ? "0" : "0.5rem",
  };

  const attachedStyles = attached
    ? {
        "& > button:not(:first-child)": {
          ...(orientation === "horizontal"
            ? {
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                marginLeft: "-1px",
              }
            : {
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
                marginTop: "-1px",
              }),
        },
        "& > button:not(:last-child)": {
          ...(orientation === "horizontal"
            ? {
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }
            : {
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }),
        },
      }
    : {};

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <div
      className={className}
      style={{ ...groupStyles, ...attachedStyles }}
      role="group"
    >
      {children}
    </div>
  );
};

// Loading Button - button with built-in async action handling
export interface LoadingButtonProps
  extends Omit<ButtonProps, "loading" | "onClick"> {
  onClick?: () => Promise<void> | void;
  loadingText?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  children,
  loadingText,
  disabled,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    if (!onClick || isLoading) return;

    try {
      setIsLoading(true);
      await onClick();
    } catch (error) {
      console.error("Button action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      {...props}
      loading={isLoading}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
};

// Copy Button - button for copying text to clipboard
export interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  text: string;
  onCopy?: () => void;
  successText?: string;
  successDuration?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onCopy,
  children = "Copy",
  successText = "Copied!",
  successDuration = 2000,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();

      setTimeout(() => {
        setCopied(false);
      }, successDuration);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Button
      {...props}
      onClick={handleCopy}
      variant={copied ? "success" : props.variant}
      rightIcon={copied ? <Icon name="check" /> : <Icon name="copy" />}
    >
      {copied ? successText : children}
    </Button>
  );
};

// Toggle Button - button that toggles between two states
export interface ToggleButtonProps extends Omit<ButtonProps, "onToggle"> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  pressedChildren?: React.ReactNode;
  pressedVariant?: ButtonProps["variant"];
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  pressed = false,
  onPressedChange,
  children,
  pressedChildren,
  variant = "outline",
  pressedVariant = "primary",
  ...props
}) => {
  const handleClick = () => {
    onPressedChange?.(!pressed);
  };

  return (
    <Button
      {...props}
      variant={pressed ? pressedVariant : variant}
      onClick={handleClick}
      aria-pressed={pressed}
    >
      {pressed && pressedChildren ? pressedChildren : children}
    </Button>
  );
};

// Split Button - button with dropdown
export interface SplitButtonProps extends ButtonProps {
  onDropdownClick?: () => void;
  dropdownIcon?: React.ReactNode;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  children,
  onDropdownClick,
  dropdownIcon = <Icon name="chevron-down" />,
  className = "",
  ...props
}) => {
  return (
    <ButtonGroup attached className={className}>
      <Button {...props}>{children}</Button>
      <Button
        {...props}
        onClick={onDropdownClick}
        className="px-2"
        aria-label="More options"
      >
        {dropdownIcon}
      </Button>
    </ButtonGroup>
  );
};

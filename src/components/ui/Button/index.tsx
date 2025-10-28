"use client";

import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { Icon } from "../Icon";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "warning";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rounded?: boolean;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "ghost",
      size = "xs",
      loading = false,
      disabled = false,
      fullWidth = false,
      rounded = true,
      leftIcon,
      rightIcon,
      className = "",
      as = "button",
      href,
      target,
      rel,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      isDisabled && styles.disabled,
      rounded && styles.rounded,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const buttonContent = (
      <>
        {loading && (
          <span className={styles.spinner}>
            <Icon name="spinner" className={styles.spinnerSvg} />
          </span>
        )}
        {!loading && leftIcon && (
          <span className={styles.leftIcon}>{leftIcon}</span>
        )}
        {children && <span className={styles.content}>{children}</span>}
        {!loading && rightIcon && (
          <span className={styles.rightIcon}>{rightIcon}</span>
        )}
      </>
    );

    if (as === "a" && href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={buttonClasses}
          {...(props as any)}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </button>
    );
  },
);

Button.displayName = "Button";

// Hook for managing button loading state
export const useButtonLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);

  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const stopLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(
    () => setIsLoading((prev) => !prev),
    [],
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
  };
};

export default Button;

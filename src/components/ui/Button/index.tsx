"use client";

import Link from "next/link";
import React, {
  type ButtonHTMLAttributes,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?:
    | "empty"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "warning";
  size?: "x" | "m" | "l" | "xl";
  align?: "left" | "center" | "right";
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
      variant = "empty",
      size = "x",
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
      align = "left",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = cn(
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`align-${align}`],
      !children && styles.iconOnly,
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      isDisabled && styles.disabled,
      rounded && styles.rounded,
      className,
    );

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
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && (
          <span className={styles.rightIcon}>{rightIcon}</span>
        )}
      </>
    );

    if (as === "a" || href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={buttonClasses}
          {...(props as any)}
        >
          {buttonContent}
        </Link>
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

export default Button;

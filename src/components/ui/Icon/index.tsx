"use client";

import React from "react";
import styles from "./Icon.module.scss";
import { iconComponents, type IconName } from "./icons";

export interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  fill?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

export interface IconComponentProps {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  fill?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

// Icon registry type
export type IconComponent = React.FC<IconComponentProps>;

// Main Icon component
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  fill = "none",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  ...props
}) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={`${styles.icon} ${className}`}
      strokeWidth={strokeWidth}
      fill={fill}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

// Base icon wrapper component
export const BaseIcon: React.FC<{
  children: React.ReactNode;
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  fill?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  viewBox?: string;
}> = ({
  children,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  fill = "none",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = !ariaLabel,
  viewBox = "0 0 24 24",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${styles.icon} ${className}`}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? "img" : undefined}
    >
      {children}
    </svg>
  );
};

export default Icon;

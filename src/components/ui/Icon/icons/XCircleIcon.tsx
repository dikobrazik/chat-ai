import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const XCircleIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </BaseIcon>
);

export default XCircleIcon;

import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const CheckCircleIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </BaseIcon>
);

export default CheckCircleIcon;

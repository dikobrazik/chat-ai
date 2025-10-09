import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const InfoIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m12 16-4-4 4-4" />
    <path d="m16 12H8" />
  </BaseIcon>
);

export default InfoIcon;

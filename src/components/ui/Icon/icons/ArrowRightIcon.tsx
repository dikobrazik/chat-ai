import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const ArrowRightIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </BaseIcon>
);

export default ArrowRightIcon;

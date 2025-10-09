import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const HelpCircleIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="m12 17 .01 0" />
  </BaseIcon>
);

export default HelpCircleIcon;

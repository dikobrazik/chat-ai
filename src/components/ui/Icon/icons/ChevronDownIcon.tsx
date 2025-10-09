import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const ChevronDownIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="m6 9 6 6 6-6" />
  </BaseIcon>
);

export default ChevronDownIcon;

import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const PlusIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 0 14" />
  </BaseIcon>
);

export default PlusIcon;

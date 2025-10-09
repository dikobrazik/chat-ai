import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const CloseIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </BaseIcon>
);

export default CloseIcon;

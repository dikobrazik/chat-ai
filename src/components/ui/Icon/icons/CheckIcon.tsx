import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const CheckIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M20 6 9 17l-5-5" />
  </BaseIcon>
);

export default CheckIcon;

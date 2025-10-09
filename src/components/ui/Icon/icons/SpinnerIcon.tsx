import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const SpinnerIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </BaseIcon>
);

export default SpinnerIcon;

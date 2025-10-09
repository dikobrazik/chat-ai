import React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const DownloadIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </BaseIcon>
);

export default DownloadIcon;

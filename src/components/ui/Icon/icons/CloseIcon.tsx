import type React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const CloseIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M13.2409 5.87517C13.485 5.63109 13.8807 5.63109 14.1248 5.87517C14.3689 6.11925 14.3689 6.51498 14.1248 6.75905L6.75911 14.1247C6.51503 14.3688 6.1193 14.3688 5.87522 14.1247C5.63115 13.8807 5.63115 13.4849 5.87522 13.2409L13.2409 5.87517Z"
      fill="black"
    />
    <path
      d="M14.1247 13.2409C14.3688 13.485 14.3688 13.8807 14.1247 14.1248C13.8806 14.3689 13.4849 14.3689 13.2408 14.1248L5.87513 6.75911C5.63105 6.51503 5.63105 6.1193 5.87513 5.87522C6.11921 5.63115 6.51494 5.63115 6.75901 5.87522L14.1247 13.2409Z"
      fill="black"
    />
  </BaseIcon>
);

export default CloseIcon;

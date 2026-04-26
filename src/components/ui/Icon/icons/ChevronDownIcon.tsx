import type React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const ChevronDownIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M9.99977 12.4C9.64977 12.4 9.29977 12.265 9.03477 12L5.77477 8.74001C5.62977 8.59501 5.62977 8.35501 5.77477 8.21001C5.91977 8.06501 6.15977 8.06501 6.30477 8.21001L9.56477 11.47C9.80477 11.71 10.1948 11.71 10.4348 11.47L13.6948 8.21001C13.8398 8.06501 14.0798 8.06501 14.2248 8.21001C14.3698 8.35501 14.3698 8.59501 14.2248 8.74001L10.9648 12C10.6998 12.265 10.3498 12.4 9.99977 12.4Z"
      fill="currentColor"
    />
  </BaseIcon>
);

export default ChevronDownIcon;

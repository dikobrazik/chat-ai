import type React from "react";
import { BaseIcon, type IconComponentProps } from "../index";

export const CheckIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props} viewBox="0 0 12 12">
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M9.24549 3.7245C9.39764 3.58405 9.63479 3.59341 9.77528 3.74549C9.91572 3.89764 9.90637 4.13479 9.75428 4.27528L5.50554 8.19708C5.31401 8.37388 5.01878 8.37387 4.82725 8.19706L2.74549 6.27528C2.59341 6.13479 2.58405 5.89764 2.7245 5.74549C2.86498 5.59341 3.10213 5.58405 3.25428 5.7245L5.16639 7.48963L9.24549 3.7245Z"
      fill="currentColor"
    />
  </BaseIcon>
);

export default CheckIcon;

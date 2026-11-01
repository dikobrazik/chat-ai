import { BaseIcon, type IconComponentProps } from "..";

export const MastercardIcon: React.FC<IconComponentProps> = ({
  size,
  ...props
}) => (
  <BaseIcon
    viewBox="7.4 7.5 116.5 72"
    size={size}
    width={typeof size === "number" ? (size * 116.5) / 72 : undefined}
    {...props}
  >
    <rect x="49.9" y="15.1" width="31.5" height="56.6" fill="#FF5F00" />
    <path
      fill="#EB001B"
      d="M51.9,43.5c0-11.5,5.4-21.7,13.7-28.3c-6.1-4.8-13.8-7.7-22.2-7.7c-19.9,0-36,16.1-36,36s16.1,36,36,36c8.4,0,16.1-2.9,22.2-7.7C57.3,65.2,51.9,54.9,51.9,43.5z"
    />
    <path
      fill="#F79E1B"
      d="M123.9,43.5c0,19.9-16.1,36-36,36c-8.4,0-16.1-2.9-22.2-7.7c8.4-6.6,13.7-16.8,13.7-28.3s-5.4-21.7-13.7-28.3c6.1-4.8,13.8-7.7,22.2-7.7C107.8,7.5,123.9,23.6,123.9,43.5z"
    />
  </BaseIcon>
);

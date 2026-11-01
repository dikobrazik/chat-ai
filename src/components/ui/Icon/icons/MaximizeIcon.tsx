import { BaseIcon, type IconComponentProps } from "..";

export const MaximizeIcon: React.FC<IconComponentProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M12.5 3.125H16.875V7.5M16.875 3.125L11.25 8.75M7.5 16.875H3.125V12.5M3.125 16.875L8.75 11.25"
      stroke="currentColor"
      strokeWidth={1.25}
    />
  </BaseIcon>
);

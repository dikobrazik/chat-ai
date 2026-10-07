import type { PropsWithChildren } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon/icons";
import { Text } from "@/components/ui/Text";

type Props = {
  icon: IconName;
  href: string;
  disabled?: boolean;
};

export const ProviderButton = ({
  icon,
  href,
  disabled,
  children,
}: PropsWithChildren<Props>) => (
  <Button
    as="a"
    replace
    variant="base"
    fullWidth
    size="m"
    disabled={disabled}
    href={href}
  >
    <span className="grid w-full grid-cols-[24px_1fr_24px] items-center gap-3">
      <Icon name={icon} size={24} />
      <Text style="regular" className="text-center">
        {children}
      </Text>
    </span>
  </Button>
);

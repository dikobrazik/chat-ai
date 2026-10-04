import Icon, { type IconProps } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import styles from "./ProviderLogo.module.scss";

export const ProviderLogo = (props: IconProps) => (
  <span className={cn("flex items-center justify-center", styles.providerLogo)}>
    <Icon size={24} {...props} />
  </span>
);

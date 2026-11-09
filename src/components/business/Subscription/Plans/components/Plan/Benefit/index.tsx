import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon/icons";
import { Text } from "@/components/ui/Text";
import styles from "./Benefit.module.scss";

type BenefitProps = {
  icon: IconName;
  children: React.ReactNode;
};

export const Benefit = ({ icon, children }: BenefitProps) => (
  <li className={styles.benefit}>
    <Icon name={icon} className={styles.icon} />
    <Text className={styles.text} style="regular" type="s">
      {children}
    </Text>
  </li>
);

import classNames from "classnames";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon/icons";
import styles from "./Message.module.scss";

type Props = Pick<ButtonProps, "pressed" | "loading" | "onClick"> & {
  icon: IconName;
  isActive?: boolean;
};

export const MessageActionButton = ({
  icon,
  isActive = false,
  ...props
}: Props) => (
  <Button
    size="x"
    className={styles.actionButton}
    leftIcon={
      <Icon
        name={icon}
        size="16"
        className={classNames(styles.actionIcon, {
          [styles.actionIconPop]: isActive,
        })}
      />
    }
    {...props}
  />
);

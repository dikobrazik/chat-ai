import classNames from "classnames";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon/icons";
import styles from "./Message.module.scss";

type Props = Pick<ButtonProps, "pressed" | "loading" | "onClick"> & {
  icon: IconName;
  activeIcon?: IconName;
  isActive?: boolean;
};

export const MessageActionButton = ({
  icon,
  activeIcon,
  isActive = false,
  ...props
}: Props) => (
  <Button
    size="x"
    className={styles.actionButton}
    leftIcon={
      <span
        className={classNames(styles.actionIcon, {
          [styles.actionIconPop]: isActive && !activeIcon,
        })}
      >
        <Icon
          name={icon}
          size="16"
          className={classNames(styles.actionIconLayer, {
            [styles.actionIconHidden]: isActive && Boolean(activeIcon),
          })}
        />
        {activeIcon && (
          <Icon
            name={activeIcon}
            size="16"
            className={classNames(styles.actionIconLayer, {
              [styles.actionIconHidden]: !isActive,
            })}
          />
        )}
      </span>
    }
    {...props}
  />
);

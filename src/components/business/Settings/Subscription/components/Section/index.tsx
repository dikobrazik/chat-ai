import type { PropsWithChildren, ReactNode } from "react";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import styles from "./Section.module.scss";

type Props = {
  title?: string;
  titleIcon?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  withDivider?: boolean;
};

export const Section = ({
  title,
  titleIcon,
  description,
  actions,
  withDivider = true,
  children,
}: PropsWithChildren<Props>) => (
  <>
    {withDivider && <Divider />}

    <section className="flex flex-col gap-3">
      <div className={styles.head}>
        <div className="flex flex-col gap-1">
          {title && (
            <div className="flex items-center gap-1.5">
              <Text type="s">{title}</Text>
              {titleIcon}
            </div>
          )}
          {description && (
            <Text type="xs" color="#6F6F6F" style="regular">
              {description}
            </Text>
          )}
        </div>

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {children}
    </section>
  </>
);

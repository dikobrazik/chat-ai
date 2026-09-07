import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import styles from "./CheckoutMessage.module.scss";

type Props = {
  title: string;
  description?: ReactNode;
  actionText: string;
  actionHref: string;
};

export const CheckoutMessage = ({
  title,
  description,
  actionText,
  actionHref,
}: Props) => (
  <div className={styles.message}>
    <Text as="h1" type="l">
      {title}
    </Text>
    {description && (
      <Text className="text-center" style="regular" type="m" color="#6F6F6F">
        {description}
      </Text>
    )}
    <Button variant="primary" size="m" align="center" href={actionHref}>
      <Text type="s" style="regular">
        {actionText}
      </Text>
    </Button>
  </div>
);

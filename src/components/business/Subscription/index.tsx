"use client";

import { usePrefetchQuery } from "@tanstack/react-query";
import { getPlans } from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

export const SubscriptionButton = () => {
  usePrefetchQuery({
    queryKey: ["subscription", "plans"],
    queryFn: getPlans,
  });

  return (
    <Button
      variant="primary"
      as="a"
      href="/plans"
      leftIcon={<Icon name="flash-circle" />}
    >
      <Text type="s" style="regular">
        Улучшить
      </Text>
    </Button>
  );
};

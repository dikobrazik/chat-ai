"use client";

import { usePrefetchQuery } from "@tanstack/react-query";
import { getPlans, PLANS_QUERY_KEY, SIX_MONTHS_PLANS_QUERY_KEY } from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

export const SubscriptionButton = () => {
  usePrefetchQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: () => getPlans(),
  });
  usePrefetchQuery({
    queryKey: SIX_MONTHS_PLANS_QUERY_KEY,
    queryFn: () => getPlans({ sixMonths: true }),
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

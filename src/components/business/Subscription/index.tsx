"use client";

import { usePrefetchQuery, useQuery } from "@tanstack/react-query";
import {
  getPlans,
  getProfile,
  PLANS_QUERY_KEY,
  SIX_MONTHS_PLANS_QUERY_KEY,
} from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { SUBSCRIBED_USER_STATUSES } from "@/constants/user";

export const SubscriptionButton = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  usePrefetchQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: () => getPlans(),
  });
  usePrefetchQuery({
    queryKey: SIX_MONTHS_PLANS_QUERY_KEY,
    queryFn: () => getPlans({ sixMonths: true }),
  });

  // подписчику апселл не нужен; пока профиль едет, кнопку тоже не рисуем —
  // иначе у подписчика она мигала бы на каждой загрузке
  if (!profile || SUBSCRIBED_USER_STATUSES.includes(profile.status)) {
    return null;
  }

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

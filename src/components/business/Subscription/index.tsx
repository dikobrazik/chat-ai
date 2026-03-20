"use client";

import { usePrefetchQuery } from "@tanstack/react-query";
import { getPlans } from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export const Subscription = () => {
  const { isGuest } = useAuthContext();

  usePrefetchQuery({
    queryKey: ["subscription", "plans"],
    queryFn: getPlans,
  });

  if (isGuest) return null;

  return (
    <Button
      variant="outline"
      as="a"
      href="/plans"
      leftIcon={<Icon size="18" name="feature" />}
    >
      Улучшить
    </Button>
  );
};

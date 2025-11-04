"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { usePrefetchQuery } from "@tanstack/react-query";
import { getPlans } from "@/api";
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
      size="md"
      variant="outline"
      as="a"
      href="/plans"
      leftIcon={<Icon size="18" name="feature" />}
    >
      Улучшить
    </Button>
  );
};

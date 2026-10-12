import type { Subscription } from "@/api/subscription";

export const isSubscriptionActive = (
  subscription?: Subscription,
  planId?: string,
) =>
  subscription?.status === "active" &&
  (!planId || subscription.plan === planId);

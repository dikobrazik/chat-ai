import type { PlanId } from "@/api";

export const PLAN_DESCRIPTION = {
  base: "С базовым доступом вам доступно:",
  pro: "С Профессиональной подпиской вам доступно:",
  plus: "С подпиской Плюс вам доступно:",
} as Record<PlanId, string>;

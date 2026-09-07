export const SIX_MONTHS_QUERY_KEY = "six-months";

export const PLANS_PATH = "/plans";

export const getPlanPath = (planId: string) => `${PLANS_PATH}/${planId}`;

export const getCheckoutPath = (planId: string, sixMonths?: boolean) =>
  `${getPlanPath(planId)}?${SIX_MONTHS_QUERY_KEY}=${Boolean(sixMonths)}`;

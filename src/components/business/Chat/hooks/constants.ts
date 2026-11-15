export const LIMIT_RESPONSE_FIELDS = {
  reason: "reason",
  resetAt: "reset_at",
};

export const RETRY_AFTER_HEADERS = {
  prompt: "retry-after-prompt",
  common: "retry-after",
};

export const LIMIT_REASON = {
  daily: "daily",
  monthlyPool: "monthlyPool",
  images: "images",
  unknown: "unknown",
};

export const LIMIT_REASON_BY_RESPONSE: Record<string, string> = {
  daily_limit: LIMIT_REASON.daily,
  monthly_pool: LIMIT_REASON.monthlyPool,
  daily_image: LIMIT_REASON.images,
};
